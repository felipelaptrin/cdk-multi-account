import { WorkloadProps } from "../stack/workload";
import { AwsAccount } from "./types";

export const productionProps: WorkloadProps = {
  environment: "development",
  env: {
    account: AwsAccount.Production,
    region: "us-east-2",
  },
};
