import { WorkloadProps } from "../stack/workload";
import { AwsAccount } from "./types";

export const developmentProps: WorkloadProps = {
  environment: "development",
  env: {
    account: AwsAccount.Development,
    region: "us-east-2",
  },
};
