import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	StatusBar,
	NativeModules,
	NativeEventEmitter,
	Platform,
	PermissionsAndroid,
	FlatList,
	TouchableHighlight,
	Pressable,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
const SECONDS_TO_SCAN_FOR = 5;
const SERVICE_UUIDS = [];
const ALLOW_DUPLICATES = false;

import BleManager, {
	BleScanCallbackType,
	BleScanMatchMode,
	BleScanMode,
} from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BLEConnect = ({ navigation, connected, setConnected }) => {
	const [isScanning, setIsScanning] = useState(false);
	const [peripherals, setPeripherals] = useState(new Map());
	const [status, setStatus] = useState(false);

	const checkStatusConnected = async () => {
		try {
			const connectedPeripherals = await BleManager.getConnectedPeripherals();
			if (connectedPeripherals.length === 0) {
				setConnected(false);
				setStatus(false);
				console.warn('[checkStatusConnected] No connected peripherals found.');
				navigation.navigate('Home');
				return;
			}
			setStatus(true);
			console.warn('[checkStatusConnected]  connected peripherals .');
		} catch (error) {
			setConnected(false);
			setStatus(false);
			console.error(
				'[checkStatusConnected] unable to retrieve connected peripherals.',
				error,
			);
		}
	};

	useEffect(() => {
		if (connected) {
			navigation.navigate('Next');

			const interval = setInterval(async () => {
				await checkStatusConnected();
			}, 2000);
			console.debug('[useEffect]');

			return () => clearInterval(interval);
		}

		return;
	}, [connected]);

	const writeDataToCharacteristic = async (
		peripheralId,
		serviceUUID,
		characteristicUUID,
		data,
	) => {
		try {
			await BleManager.write(
				peripheralId,
				serviceUUID,
				characteristicUUID,
				data,
			);
			console.debug(
				`Data successfully written to characteristic ${characteristicUUID}`,
			);
		} catch (error) {
			console.error(
				`Error writing data to characteristic ${characteristicUUID}:`,
				error,
			);
		}
	};

	const handleTouchSendData = async () => {
		/* Test write data to a characteristic (replace with your own data) */
		// const serviceUUID = 'YOUR_SERVICE_UUID';
		// const characteristicUUID = 'YOUR_CHARACTERISTIC_UUID';
		// const dataToWrite = 'Hello, BLE!'; // Replace with your own data
		// await writeDataToCharacteristic(
		//   peripheral.id,
		//   serviceUUID,
		//   characteristicUUID,
		//   dataToWrite,
		// );
	};

	const addOrUpdatePeripheral = (id, updatedPeripheral) => {
		setPeripherals((map) => new Map(map.set(id, updatedPeripheral)));
	};

	const startScan = () => {
		if (!isScanning) {
			setPeripherals(new Map());
			try {
				console.debug('[startScan] starting scan...');
				setIsScanning(true);
				BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
					matchMode: BleScanMatchMode.Sticky,
					scanMode: BleScanMode.LowLatency,
					callbackType: BleScanCallbackType.FirstMatch,
				})
					.then(() => {
						console.debug('[startScan] scan promise returned successfully.');
					})
					.catch((err) => {
						console.error('[startScan] ble scan returned in error', err);
					});
			} catch (error) {
				console.error('[startScan] ble scan error thrown', error);
			}
		}
	};

	const handleStopScan = () => {
		setIsScanning(false);
		console.debug('[handleStopScan] scan is stopped.');
		console.debug('peripherals map updated', [...peripherals.entries()]);
	};

	const handleDisconnectedPeripheral = (event) => {
		let peripheral = peripherals.get(event.peripheral);
		if (peripheral) {
			console.debug(
				`[handleDisconnectedPeripheral][${peripheral.id}] previously connected peripheral is disconnected.`,
				event.peripheral,
			);
			addOrUpdatePeripheral(peripheral.id, {
				...peripheral,
				connected: false,
			});
		}
		console.debug(
			`[handleDisconnectedPeripheral][${event.peripheral}] disconnected.`,
		);
	};

	const handleUpdateValueForCharacteristic = (data) => {
		console.debug(
			`[handleUpdateValueForCharacteristic] received data from '${data.peripheral}' with characteristic='${data.characteristic}' and value='${data.value}'`,
		);
	};

	const handleDiscoverPeripheral = (peripheral) => {
		console.debug('[handleDiscoverPeripheral] new BLE peripheral=', peripheral);
		if (!peripheral.name) {
			peripheral.name = 'NO NAME';
		}
		addOrUpdatePeripheral(peripheral.id, peripheral);
	};

	const togglePeripheralConnection = async (peripheral) => {
		if (peripheral && peripheral.connected) {
			try {
				await BleManager.disconnect(peripheral.id);
			} catch (error) {
				console.error(
					`[togglePeripheralConnection][${peripheral.id}] error when trying to disconnect device.`,
					error,
				);
			}
		} else {
			await connectPeripheral(peripheral);
		}
	};

	const retrieveConnected = async () => {
		try {
			const connectedPeripherals = await BleManager.getConnectedPeripherals();
			if (connectedPeripherals.length === 0) {
				console.warn('[retrieveConnected] No connected peripherals found.');
				return;
			}

			console.debug(
				'[retrieveConnected] connectedPeripherals',
				connectedPeripherals,
			);

			setStatus(true);
			setConnected(true);

			for (var i = 0; i < connectedPeripherals.length; i++) {
				var peripheral = connectedPeripherals[i];
				addOrUpdatePeripheral(peripheral.id, {
					...peripheral,
					connected: true,
				});
			}
		} catch (error) {
			console.error(
				'[retrieveConnected] unable to retrieve connected peripherals.',
				error,
			);
		}
	};

	const connectPeripheral = async (peripheral) => {
		try {
			if (peripheral) {
				addOrUpdatePeripheral(peripheral.id, {
					...peripheral,
					connecting: true,
				});

				await BleManager.connect(peripheral.id);
				console.debug(`[connectPeripheral][${peripheral.id}] connected.`);

				addOrUpdatePeripheral(peripheral.id, {
					...peripheral,
					connecting: false,
					connected: true,
				});

				await sleep(900);

				const peripheralData = await BleManager.retrieveServices(peripheral.id);
				console.debug(
					`[connectPeripheral][${peripheral.id}] retrieved peripheral services`,
					peripheralData,
				);

				const rssi = await BleManager.readRSSI(peripheral.id);
				console.debug(
					`[connectPeripheral][${peripheral.id}] retrieved current RSSI value: ${rssi}.`,
				);

				if (peripheralData.characteristics) {
					for (let characteristic of peripheralData.characteristics) {
						if (characteristic.descriptors) {
							for (let descriptor of characteristic.descriptors) {
								try {
									let data = await BleManager.readDescriptor(
										peripheral.id,
										characteristic.service,
										characteristic.characteristic,
										descriptor.uuid,
									);
									console.debug(
										`[connectPeripheral][${peripheral.id}] descriptor read as:`,
										data,
									);
								} catch (error) {
									console.error(
										`[connectPeripheral][${peripheral.id}] failed to retrieve descriptor ${descriptor} for characteristic ${characteristic}:`,
										error,
									);
								}
							}
						}
					}
				}

				let p = peripherals.get(peripheral.id);
				if (p) {
					addOrUpdatePeripheral(peripheral.id, { ...peripheral, rssi });
				}
			}
		} catch (error) {
			console.error(
				`[connectPeripheral][${peripheral.id}] connectPeripheral error`,
				error,
			);
		}
	};

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	useEffect(() => {
		try {
			BleManager.start({ showAlert: false })
				.then(() => console.debug('BleManager started.'))
				.catch((error) =>
					console.error('BeManager could not be started.', error),
				);
		} catch (error) {
			console.error('unexpected error starting BleManager.', error);
			return;
		}

		const listeners = [
			bleManagerEmitter.addListener(
				'BleManagerDiscoverPeripheral',
				handleDiscoverPeripheral,
			),
			bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
			bleManagerEmitter.addListener(
				'BleManagerDisconnectPeripheral',
				handleDisconnectedPeripheral,
			),
			bleManagerEmitter.addListener(
				'BleManagerDidUpdateValueForCharacteristic',
				handleUpdateValueForCharacteristic,
			),
		];

		handleAndroidPermissions();

		return () => {
			console.debug('[app] main component unmounting. Removing listeners...');
			for (const listener of listeners) {
				listener.remove();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAndroidPermissions = () => {
		if (Platform.OS === 'android' && Platform.Version >= 31) {
			PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
				PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
			]).then((result) => {
				if (result) {
					console.debug(
						'[handleAndroidPermissions] User accepts runtime permissions android 12+',
					);
				} else {
					console.error(
						'[handleAndroidPermissions] User refuses runtime permissions android 12+',
					);
				}
			});
		} else if (Platform.OS === 'android' && Platform.Version >= 23) {
			PermissionsAndroid.check(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			).then((checkResult) => {
				if (checkResult) {
					console.debug(
						'[handleAndroidPermissions] runtime permission Android <12 already OK',
					);
				} else {
					PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					).then((requestResult) => {
						if (requestResult) {
							console.debug(
								'[handleAndroidPermissions] User accepts runtime permission android <12',
							);
						} else {
							console.error(
								'[handleAndroidPermissions] User refuses runtime permission android <12',
							);
						}
					});
				}
			});
		}
	};

	const renderItem = ({ item }) => {
		const backgroundColor = item.connected ? '#069400' : Colors.white;
		return (
			<TouchableHighlight
				underlayColor="#0082FC"
				onPress={() => togglePeripheralConnection(item)}>
				<View style={[styles.row, { backgroundColor }]}>
					<Text style={styles.peripheralName}>
						{item.name} - {item?.advertising?.localName}
						{item.connecting && ' - Connecting...'}
					</Text>
					<Text style={styles.rssi}>RSSI: {item.rssi}</Text>
					<Text style={styles.peripheralId}>{item.id}</Text>
				</View>
			</TouchableHighlight>
		);
	};

	return (
		<>
			<StatusBar />
			<SafeAreaView style={styles.body}>
				{/* <Pressable style={styles.scanButton} onPress={startScan}>
          <Text style={styles.scanButtonText}>
            {isScanning ? 'Scanning...' : 'Scan Bluetooth'}
          </Text>
        </Pressable> */}

				<Pressable style={styles.scanButton} onPress={retrieveConnected}>
					{!connected && (
						<Text style={styles.scanButtonText}>
							{'Press for check status'}
						</Text>
					)}
				</Pressable>

				{/* {Array.from(peripherals.values()).length === 0 && (
          <View style={styles.row}>
            <Text style={styles.noPeripherals}>
              No Peripherals, press "Scan Bluetooth" above.
            </Text>
          </View>
        )}

        <FlatList
          data={Array.from(peripherals.values())}
          contentContainerStyle={{rowGap: 12}}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        /> */}
			</SafeAreaView>
		</>
	);
};

const boxShadow = {
	shadowColor: '#000',
	shadowOffset: {
		width: 0,
		height: 2,
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,
	elevation: 5,
};

const styles = StyleSheet.create({
	engine: {
		position: 'absolute',
		right: 10,
		bottom: 0,
		color: Colors.black,
	},
	scanButton: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 16,
		backgroundColor: '#0a398a',
		margin: 10,
		borderRadius: 12,
		...boxShadow,
	},
	scanButtonText: {
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: 20,
		letterSpacing: 0.25,
		color: Colors.white,
	},
	body: {
		marginTop: 20,
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: Colors.black,
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
		color: Colors.dark,
	},
	highlight: {
		fontWeight: '700',
	},
	footer: {
		color: Colors.dark,
		fontSize: 12,
		fontWeight: '600',
		padding: 4,
		paddingRight: 12,
		textAlign: 'right',
	},
	peripheralName: {
		fontSize: 16,
		textAlign: 'center',
		padding: 10,
	},
	rssi: {
		fontSize: 12,
		textAlign: 'center',
		padding: 2,
	},
	peripheralId: {
		fontSize: 12,
		textAlign: 'center',
		padding: 2,
		paddingBottom: 20,
	},
	row: {
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 20,
		...boxShadow,
	},
	noPeripherals: {
		margin: 10,
		textAlign: 'center',
		color: Colors.white,
	},
});

export default BLEConnect;
