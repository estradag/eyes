import { Card, CardActions, CardHeader } from "material-ui/Card";
import { fromJS } from "immutable";
import { Tabs, Tab } from "material-ui/Tabs";
import AddDatabase from "./mysql/AddDatabase";
import Avatar from "material-ui/Avatar";
import Base from "./mysql/Base";
import Chip from "material-ui/Chip";
import cookie from "react-cookie";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";
import PropTypes from "prop-types";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import Toggle from "material-ui/Toggle";

const styles = {
  block: {
    maxWidth: 250
  },
  button: {
    padding: 12
  },
  chip: {
    margin: 4,
  },
  body: {
    padding: 0
  },
  radioButton: {
    marginBottom: 16,
    marginLeft: 16
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
  }
};

const MysqlRole = ( {end, environments, applicationAppState, removeMysqlDatabases, removeMysqlPackages, removeMysqlUsers, setMysqlUser, setMysqlRootPassword, setActiveEnvironment, setEnableMysql, setEnableMariadb, setMysqlDatabases, setShowMysql, mysqlAppState, removeMysqlDatabase, removeMysqlUser, setShowMysqlUser, setShowMysqlDatabase, enable, type} ) => {
  const handleRemoveDatabase = (e, database) => {
    removeMysqlDatabase(
      fromJS({
        mysql_databases: mysqlAppState.get("mysql_users")?mysqlAppState.get("mysql_users").toJS():[],
        mysql_database: database
      })
    );
    mysqlAppState.get("mysql_users")?mysqlAppState.get("mysql_users").filter(user=>
      user.get("environment") === environments[applicationAppState.get("active_environment")].id &&   user.get("priv") === database.name+".*:ALL"
    ).toJS().map((user)=>{
      removeMysqlUser(
        fromJS({
          mysql_users: mysqlAppState.get("mysql_users")?mysqlAppState.get("mysql_users").toJS():[],
          mysql_user: user
        })
      );
    }):"";
  };
  const handleShowDatabase = () => {
    setShowMysqlDatabase(
      fromJS({
        show_mysql_database: !mysqlAppState.get("show_mysql_database")
      })
    );
  };
  const handleChangeEnvironment = (value) => {
    setActiveEnvironment(fromJS({
      active_environment:value
    }));
  };
  const handleEnable = () => {
    if(enable){
      removeMysqlDatabases();
      removeMysqlPackages();
      removeMysqlUsers();
    }
    if(type=="MySQL")
      setEnableMysql(
        fromJS({
          enable_mysql: !enable
        })
      );
    else
      setEnableMariadb(
        fromJS({
          enable_mariadb: !enable
        })
      );
  };
  const handleSaveConfigurations = () => {
    if(mysqlAppState.get("show_mysql")){
      let mysqlRootPasswordArray = [];
      environments.map((value,index)=>{
        if(cookie.load("mysql_root_password-"+index)){
          if(cookie.load("mysql_root_password-"+index).id)
            mysqlRootPasswordArray.push({
              id: cookie.load("mysql_root_password-"+index).id,
              environment: cookie.load("mysql_root_password-"+index).environment,
              password: cookie.load("mysql_root_password-"+index).password
            });
          else
            mysqlRootPasswordArray.push({
              environment: cookie.load("mysql_root_password-"+index).environment,
              password: cookie.load("mysql_root_password-"+index).password
            });
          cookie.remove("mysql_root_password-"+index, { path: "/" });
        }
      });
      if(mysqlRootPasswordArray.length>0)
      setMysqlRootPassword(
        fromJS({
          mysql_root_passwords: mysqlAppState.get("mysql_root_password")?mysqlAppState.get("mysql_root_password").toJS():[],
          mysql_root_password: mysqlRootPasswordArray
        })
      );
      cookie.remove("mysql_users-host", { path: "/" });
      cookie.remove("mysql_users-name", { path: "/" });
      cookie.remove("mysql_users-password", { path: "/" });
    }
    setShowMysql(
      fromJS({
        show_mysql: !mysqlAppState.get("show_mysql")
      })
    );
  };
  const handleCancelSaveConfigurations = () => {
    environments.map((value,index)=>{
      cookie.remove("mysql_root_password-"+index, { path: "/" });
    });
    cookie.remove("mysql_users-host", { path: "/" });
    cookie.remove("mysql_users-name", { path: "/" });
    cookie.remove("mysql_users-password", { path: "/" });
    setShowMysql(
      fromJS({
        show_mysql: !mysqlAppState.get("show_mysql")
      })
    );
  };
  const actions = [
      <FlatButton
          icon={<FontIcon className="icon icon-cancel" />}
          key={2}
          label={"Cancel"}
          onTouchTap={handleCancelSaveConfigurations}
          secondary
      />,
      <FlatButton
          icon={<FontIcon className="icon icon-save" />}
          key={1}
          label={"Save"}
          onTouchTap={handleSaveConfigurations}
          primary
      />
    ];
  const databases = () => {
    return mysqlAppState.get("mysql_databases")?mysqlAppState.get("mysql_databases").filter(value=>
      value.get("environment") === environments[applicationAppState.get("active_environment")].id
    ).toJS().map((value,index)=>
      <Chip
          // onTouchTap={handleClick}
          key={index}
          onRequestDelete={(event)=>handleRemoveDatabase(event, value)}
          style={styles.chip}
      >
        <Avatar icon={<FontIcon className="icon icon-person" />} />
        {value.name}
      </Chip>
    ):"";
  };
  return (
    <div className={"small-6 medium-3 large-3 columns one-click-app "+(end ? "end":"")}>
      <Card>
        <CardHeader
            avatar={<FontIcon className={"icon icon-mysql"}/>}
            subtitle={"Relational Database"}
            title={type}
        />
        <CardActions>
          <Toggle
              label="Enabled"
              labelPosition="right"
              onToggle={handleEnable}
              toggled={enable?true:false}
          />
          <FlatButton
              label={"Configuration"}
              onTouchTap={handleSaveConfigurations}
          />
        </CardActions>
        <Dialog
            actions={actions}
            actionsContainerStyle={styles.button}
            autoScrollBodyContent
            bodyStyle={styles.body}
            modal={false}
            onRequestClose={handleCancelSaveConfigurations}
            open={mysqlAppState.get("show_mysql")?true:false}
            title="Configurations"
        >
          <AddDatabase
              activeEnvironment={environments[applicationAppState.get("active_environment")].id}
              applicationAppState={applicationAppState}
              environments={environments}
              mysqlAppState={mysqlAppState}
              removeMysqlUser={removeMysqlUser}
              setMysqlDatabases={setMysqlDatabases}
              setMysqlUser={setMysqlUser}
              setShowMysqlDatabase={setShowMysqlDatabase}
              setShowMysqlUser={setShowMysqlUser}
          />
          <Tabs
              onChange={handleChangeEnvironment}
              value={applicationAppState.get("active_environment")}
          >
            {environments.map((value, index)=>
              <Tab
                  key={index}
                  label={value.name}
                  value={index}
              />
            )}
          </Tabs>
          <SwipeableViews
              index={applicationAppState.get("active_environment")}
              onChangeIndex={handleChangeEnvironment}
          >
            {environments.map((value, index)=>
              <div
                  className={"small-12 medium-12 large-12 columns"}
                  key={index}
              >
                <Base
                    activeEnvironment={environments[applicationAppState.get("active_environment")].id}
                    mysqlAppState={mysqlAppState}
                />
                <h2>{"DataBases"}</h2>
                <div style={styles.wrapper}>
                  {databases()}
                  <Chip
                      onTouchTap={handleShowDatabase}
                      style={styles.chip}
                  >
                    <Avatar icon={<FontIcon className="icon icon-person" />} />
                    {"Add Database"}
                  </Chip>
                </div>
              </div>
            )}
          </SwipeableViews>
        </Dialog>
      </Card>
    </div>
  );
};

MysqlRole.propTypes = {
  applicationAppState: PropTypes.object.isRequired,
  enable: PropTypes.bool.isRequired,
  end: PropTypes.bool.isRequired,
  environments: PropTypes.array.isRequired,
  mysqlAppState: PropTypes.object.isRequired,
  removeMysqlDatabase: PropTypes.func.isRequired,
  removeMysqlDatabases: PropTypes.func.isRequired,
  removeMysqlPackages: PropTypes.func.isRequired,
  removeMysqlUser: PropTypes.func.isRequired,
  removeMysqlUsers: PropTypes.func.isRequired,
  setActiveEnvironment: PropTypes.func.isRequired,
  setEnableMariadb: PropTypes.func.isRequired,
  setEnableMysql: PropTypes.func.isRequired,
  setMysqlDatabases: PropTypes.func.isRequired,
  setMysqlRootPassword: PropTypes.func.isRequired,
  setMysqlUser: PropTypes.func.isRequired,
  setShowMysql: PropTypes.func.isRequired,
  setShowMysqlDatabase: PropTypes.func.isRequired,
  setShowMysqlUser: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default MysqlRole;
