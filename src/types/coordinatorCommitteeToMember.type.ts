export interface ICoordinatorCommitteeToMember {
  id: string;
  cadence_id: string;
  coordinator_id: string;
  member_id: string;
  create_date: Date;
}

// Create
export interface ICoordinatorCommitteeToMember_Create extends Omit<ICoordinatorCommitteeToMember, 'id' | 'create_date'> {}
export interface ICoordinatorCommitteeToMember_Create_Res extends ICoordinatorCommitteeToMember {}
export interface ICoordinatorCommitteeToMember_Db_Create extends Omit<ICoordinatorCommitteeToMember, 'id' | 'create_date'> {}
export interface ICoordinatorCommitteeToMember_Db_Create_Res extends ICoordinatorCommitteeToMember {}

// Get by list
export interface ICoordinatorCommitteeToMember_GetList_Res extends ICoordinatorCommitteeToMember {}
export interface ICoordinatorCommitteeToMember_Db_GetList_Res extends ICoordinatorCommitteeToMember {}

// Get by id
export interface ICoordinatorCommitteeToMember_GetById extends Pick<ICoordinatorCommitteeToMember, 'id'> {}
export interface ICoordinatorCommitteeToMember_GetById_Res extends ICoordinatorCommitteeToMember {}
export interface ICoordinatorCommitteeToMember_Db_GetById extends Pick<ICoordinatorCommitteeToMember, 'id'> {}
export interface ICoordinatorCommitteeToMember_Db_GetById_Res extends ICoordinatorCommitteeToMember {}
