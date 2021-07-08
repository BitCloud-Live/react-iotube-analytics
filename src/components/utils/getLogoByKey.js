import AAVE from '../../assets/coins-logo/AAVE.png';
import BUSD from '../../assets/coins-logo/BUSD.png';
import DAI from '../../assets/coins-logo/DAI.png';
import IOTX from '../../assets/coins-logo/IOTX.png';
import LINK from '../../assets/coins-logo/LINK.png';
import PAXG from '../../assets/coins-logo/PAXG.png';
import SUSHI from '../../assets/coins-logo/SUSHI.png';
import UNI from '../../assets/coins-logo/UNI.png';
import USDC from '../../assets/coins-logo/USDC.png';
import USDT from '../../assets/coins-logo/USDT.png';
import WBTC from '../../assets/coins-logo/WBTC.png';
import WETH from '../../assets/coins-logo/WETH.jpeg';
import WMATIC from '../../assets/coins-logo/WMATIC.png';
import QUICK from '../../assets/coins-logo/QUICK.png';
import CYC from '../../assets/coins-logo/CYC.jpg';

const images = {
    AAVE,
    BUSD,
    DAI,
    IOTX,
    LINK,
    PAXG,
    SUSHI,
    UNI,
    USDC,
    USDT,
    WBTC,
    WETH,
    WMATIC,
    QUICK,
    CYC

};

function getLogoByKey(key) {
    return images[key]
}

export default getLogoByKey