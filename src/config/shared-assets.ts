import { SharedAssetsProps } from "../stack/shared-assets";
import { AwsAccount } from "./types";

export const sharedAssetsProps: SharedAssetsProps = {
  env: {
    account: AwsAccount.SharedAssets,
    region: "us-east-2",
  },
  ecrRepository: ["backend"],
};
