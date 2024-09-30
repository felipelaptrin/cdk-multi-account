import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";

import { CodePipelineStack } from "../src/pipeline/codepipeline";
import { pipelineProps } from "../src/config/pipeline";
import { developmentProps } from "../src/config/development";
import { WorkflowStack } from "../src/stack/workload";
import { productionProps } from "../src/config/production";
import { SharedAssetsStack } from "../src/stack/shared-assets";
import { sharedAssetsProps } from "../src/config/shared-assets";


test("snapshot for Pipeline stack", () => {
  const app = new cdk.App();
  const stack = new CodePipelineStack(app, "PipelineStack", pipelineProps);

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test("snapshot for Shared Assets stack", () => {
  const app = new cdk.App();
  const stack = new SharedAssetsStack(app, "WorkloadDevelopmentStack", sharedAssetsProps);

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test("snapshot for Workload stack - Development", () => {
  const app = new cdk.App();
  const stack = new WorkflowStack(app, "WorkloadDevelopmentStack", developmentProps);

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test("snapshot for Workload stack - Production", () => {
  const app = new cdk.App();
  const stack = new WorkflowStack(app, "WorkloadProductionStack", productionProps);

  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
