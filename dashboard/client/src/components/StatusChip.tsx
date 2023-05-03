import { Color, createStyles, makeStyles } from "@material-ui/core";
import {
  blue,
  blueGrey,
  cyan,
  green,
  grey,
  orange,
  red,
  yellow,
} from "@material-ui/core/colors";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import React, { ReactNode } from "react";
import { ActorEnum } from "../type/actor";
import { PlacementGroupState } from "../type/placementGroup";
import {
  ServeApplicationStatus,
  ServeDeploymentStatus,
  ServeReplicaState,
} from "../type/serve";
import { TypeTaskStatus } from "../type/task";

const colorMap = {
  node: {
    ALIVE: green,
    DEAD: red,
  },
  worker: {
    ALIVE: green,
    DEAD: red,
  },
  actor: {
    [ActorEnum.ALIVE]: green,
    [ActorEnum.DEAD]: red,
    [ActorEnum.DEPENDENCIES_UNREADY]: orange,
    [ActorEnum.PENDING_CREATION]: orange,
    [ActorEnum.RESTARTING]: orange,
  },
  task: {
    [TypeTaskStatus.FAILED]: red,
    [TypeTaskStatus.FINISHED]: green,
    [TypeTaskStatus.RUNNING]: blue,
    [TypeTaskStatus.SUBMITTED_TO_WORKER]: orange,
    [TypeTaskStatus.PENDING_NODE_ASSIGNMENT]: orange,
    [TypeTaskStatus.PENDING_ARGS_AVAIL]: orange,
    [TypeTaskStatus.NIL]: grey,
  },
  job: {
    PENDING: orange,
    RUNNING: blue,
    STOPPED: grey,
    SUCCEEDED: green,
    FAILED: red,
  },
  placementGroup: {
    [PlacementGroupState.PENDING]: orange,
    [PlacementGroupState.CREATED]: green,
    [PlacementGroupState.REMOVED]: grey,
    [PlacementGroupState.RESCHEDULING]: orange,
  },
  serveApplication: {
    [ServeApplicationStatus.NOT_STARTED]: grey,
    [ServeApplicationStatus.DEPLOYING]: yellow,
    [ServeApplicationStatus.RUNNING]: green,
    [ServeApplicationStatus.DEPLOY_FAILED]: red,
    [ServeApplicationStatus.DELETING]: yellow,
  },
  serveDeployment: {
    [ServeDeploymentStatus.UPDATING]: yellow,
    [ServeDeploymentStatus.HEALTHY]: green,
    [ServeDeploymentStatus.UNHEALTHY]: red,
  },
  serveReplica: {
    [ServeReplicaState.STARTING]: yellow,
    [ServeReplicaState.UPDATING]: yellow,
    [ServeReplicaState.RECOVERING]: orange,
    [ServeReplicaState.RUNNING]: green,
    [ServeReplicaState.STOPPING]: red,
  },
} as {
  [key: string]: {
    [key: string]: Color | string;
  };
};

const typeMap = {
  deps: blue,
  INFO: cyan,
  ERROR: red,
} as {
  [key: string]: Color;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: "2px 8px",
      border: "solid 1px",
      borderRadius: 4,
      fontSize: 12,
      margin: 2,
      display: "inline-flex",
      alignItems: "center",
    },
    afterIcon: {
      marginLeft: 4,
    },
  }),
);

export const StatusChip = ({
  type,
  status,
  suffix,
  icon,
}: {
  type: string;
  status: string | ActorEnum | ReactNode;
  suffix?: string;
  icon?: ReactNode;
}) => {
  const classes = useStyles();
  let color: Color | string = blueGrey;

  if (typeMap[type]) {
    color = typeMap[type];
  } else if (
    typeof status === "string" &&
    colorMap[type] &&
    colorMap[type][status]
  ) {
    color = colorMap[type][status];
  }

  const colorValue = typeof color === "string" ? color : color[500];

  const style: CSSProperties = {};
  style.color = colorValue;
  style.borderColor = colorValue;
  if (color !== blueGrey) {
    style.backgroundColor = `${colorValue}20`;
  }

  return (
    <span className={classes.root} style={style}>
      {icon}
      <span className={classNames({ [classes.afterIcon]: icon !== undefined })}>
        {status}
      </span>
      {suffix}
    </span>
  );
};
