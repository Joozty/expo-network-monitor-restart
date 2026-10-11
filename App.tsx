import * as Network from 'expo-network';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type Subscription = ReturnType<typeof Network.addNetworkStateListener>;

export default function App() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [subscriptionNumber, setSubscriptionNumber] = useState(0);
  const [events, setEvents] = useState(0);
  const [lastState, setLastState] = useState<Network.NetworkStateEvent | null>(null);

  const toggle = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
      return;
    }
    setSubscriptionNumber((n) => n + 1);
    setEvents(0);
    setLastState(null);
    setSubscription(
      Network.addNetworkStateListener((state) => {
        setEvents((n) => n + 1);
        setLastState(state);
      })
    );
  };

  return (
    <View style={styles.container}>
      <Button title={subscription ? 'Unsubscribe' : 'Subscribe'} onPress={toggle} />
      <Text style={styles.text}>Subscription #{subscriptionNumber}</Text>
      <Text style={styles.text}>Events received: {events}</Text>
      <Text style={styles.text}>Last state: {lastState ? JSON.stringify(lastState) : '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    fontSize: 18,
    marginTop: 12,
  },
});
