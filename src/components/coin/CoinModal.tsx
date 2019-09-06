import React from 'react';
import { StyleSheet } from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewForceInsetValue,
} from 'react-navigation';
import Modal from 'react-native-modal';
import {
  TabView,
  LoadingLayer,
  CoinChargeView,
} from 'components';
import { palette } from 'constants/style';

const ROUTES = [
  { key: 'charge', title: '코인 충전' },
  { key: 'history', title: '사용 내역' },
];

const SAFE_AREA_INSET: {
  top: SafeAreaViewForceInsetValue;
  bottom: SafeAreaViewForceInsetValue;
} = {
  top: 'never',
  bottom: 'always',
};

const COINS = [{
  id: '1',
  amount: 10,
  price: 3000,
  retailPrice: 2900,
}, {
  id: '2',
  amount: 30,
  price: 9000,
  retailPrice: 8200,
}, {
  id: '3',
  amount: 200,
  price: 60000,
  retailPrice: 51900,
}];

interface Props {
  isVisible: boolean;
  isLoading: boolean;
  hide: () => void;
}

const CoinModal: React.FunctionComponent<Props> = ({
  isVisible,
  isLoading,
  hide,
}) => {
  return (
    <React.Fragment>
      {isLoading && <LoadingLayer />}
      <Modal
        isVisible={isVisible}
        onBackdropPress={hide}
        onBackButtonPress={hide}
        style={styles.modal}
        backdropOpacity={0.4}
        animationInTiming={400}
        animationOutTiming={600}
        hideModalContentWhileAnimating={true}
        useNativeDriver
      >
        <SafeAreaView forceInset={SAFE_AREA_INSET} style={styles.container}>
          <TabView routes={ROUTES}>
            <CoinChargeView items={COINS} />
            <CoinChargeView items={COINS} />
          </TabView>
        </SafeAreaView>
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    height: 288,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: palette.white.default,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export default React.memo(CoinModal);