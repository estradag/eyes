import * as types from '../../constants/ActionTypes';

export function receiveRepository(integration){
  return {
    type: types.SET_INTEGRATION,
    value: integration
  };
}

export function receiveRepositories(repositories){
  return{
    type: types.SET_REPOSITORIES,
    value: repositories
  };
}

export function setCloudProviderAccess(cloudProviderAccess){
  return{
    type: types.SET_CLOUD_PROVIDER,
    value: cloudProviderAccess
  };
}

export function setCloudProviderSshKeys(cloudProviderSshKeys){
  return{
    type: types.SET_CLOUD_PROVIDER_SSH_KEY,
    value: cloudProviderSshKeys
  };
}

export function requestCloudProviderSSHKeys(cloudProviderAccess){
  return{
    type: types.REQUEST_CLOUD_PROVIDER_KEYS,
    value: cloudProviderAccess
  };
}

export function setUser(user){
  return{
    type: types.SET_USER_SESION,
    value: user
  };
}

export function setUserSesion(userSesion){
  return{
    type: types.SET_USER_SESION,
    value: userSesion
  };
}