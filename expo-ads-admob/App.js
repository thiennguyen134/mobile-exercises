import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, SafeAreaView } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { useState, useEffect } from 'react';

const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true
});

const rewardedInterstitialAd = RewardedInterstitialAd.createForAdRequest(TestIds.REWARDED_INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true
});

export default function App() {
  const [isInterstitialLoaded, setIsInterstitialLoaded] = useState(false);
  const [isRewardedInterstitialLoaded, setIsRewardedInterstitialLoaded] = useState(false);

  useEffect(() => {
    const loadInterstitial = async () => {
      await interstitialAd.load();
      setIsInterstitialLoaded(true);

      const unsubscribeClosed = interstitialAd.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          setIsInterstitialLoaded(false);
          loadInterstitial();
        }
      );
  
      return () => {
        unsubscribeClosed();
      };
    };
  
    const loadRewardedInterstitial = async () => {
      await rewardedInterstitialAd.load();
      setIsRewardedInterstitialLoaded(true);
  
      const unsubscribeEarned = rewardedInterstitialAd.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
          console.log(`User earned reward of ${reward.amount} ${reward.type}`);
        }
      );
  
      const unsubscribeClosed = rewardedInterstitialAd.addAdEventListener(
        AdEventType.CLOSED,
        () => {
          setIsRewardedInterstitialLoaded(false);
          loadRewardedInterstitial();
        }
      );
  
      return () => {
        unsubscribeEarned();
        unsubscribeClosed();
      };
    };
  
    loadInterstitial();
    loadRewardedInterstitial();
  }, []);

  const onInterstitialPress = () => {
    if (isInterstitialLoaded) {
      interstitialAd.show();
    } else {
      console.log('Interstitial ad is not loaded yet.');
    }
  };

  const onRewardedInterstitialPress = () => {
    if (isRewardedInterstitialLoaded) {
      rewardedInterstitialAd.show();
    } else {
      console.log('Rewarded interstitial ad is not loaded yet.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Button title="Show Interstitial" onPress={onInterstitialPress} disabled={!isInterstitialLoaded}/>
        <Button title="Show Rewarded Interstitial" onPress={onRewardedInterstitialPress} disabled={!isRewardedInterstitialLoaded}/>
      </View>
      <BannerAd 
        unitId={TestIds.BANNER}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
