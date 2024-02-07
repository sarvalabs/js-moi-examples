import { AssetStandard, IxType, VoyageProvider } from "js-moi-sdk";

const provider = new VoyageProvider("babylon");

const CreateAsset = async (wallet, assetStandard, symbol, supply) => {
  const payload = {};
  payload.standard = AssetStandard[assetStandard];
  payload.symbol = symbol;
  payload.supply = assetStandard === "MAS0" ? supply : 1;

  const ixResponse = await wallet.sendInteraction({
    type: IxType.ASSET_CREATE,
    fuel_price: 1,
    fuel_limit: 200,
    payload,
  });

  return ixResponse.wait();
};

const TransferAsset = async (wallet, receiver, assetId, amount) => {
  const transferValues = new Map();
  transferValues.set(assetId, parseInt(amount)); // had to parseInt - workaround

  const ixResponse = await wallet.sendInteraction({
    type: IxType.VALUE_TRANSFER,
    fuel_price: 1,
    fuel_limit: 200,
    receiver: receiver,
    transfer_values: transferValues, // Only new Map()
  });

  return ixResponse.wait();
};

////////////////////////
// Reads
///////////////////////

const GetUsersAsset = async (address) => {
  return provider.getTDU(address);
};

const GetAssetInfo = async (asset_id) => {
  return provider.getAssetInfoByAssetID(asset_id);
};

const interaction = {
  CreateAsset,
  TransferAsset,
  GetUsersAsset,
  GetAssetInfo,
};

export default interaction;
