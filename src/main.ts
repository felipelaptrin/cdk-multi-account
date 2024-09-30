#!/usr/bin/env ts-node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CodePipelineStack } from "./pipeline/codepipeline";
import { pipelineProps } from "./config/pipeline";

const app = new cdk.App();

new CodePipelineStack(app, "MultiAccountStack", pipelineProps);
