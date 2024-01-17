import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, UncontrolledTooltip } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { IJobHistory } from 'app/shared/model/job-history.model';
import { getEntities as getJobHistories } from 'app/entities/job-history/job-history.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { Pays } from 'app/shared/model/enumerations/pays.model';
import { TypeEmployed } from 'app/shared/model/enumerations/type-employed.model';
import { getEntity, updateEntity, createEntity, reset } from './employee.reducer';

export const EmployeeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const employees = useAppSelector(state => state.employee.entities);
  const departments = useAppSelector(state => state.department.entities);
  const jobHistories = useAppSelector(state => state.jobHistory.entities);
  const employeeEntity = useAppSelector(state => state.employee.entity);
  const loading = useAppSelector(state => state.employee.loading);
  const updating = useAppSelector(state => state.employee.updating);
  const updateSuccess = useAppSelector(state => state.employee.updateSuccess);
  const paysValues = Object.keys(Pays);
  const typeEmployedValues = Object.keys(TypeEmployed);

  const handleClose = () => {
    navigate('/employee');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getEmployees({}));
    dispatch(getDepartments({}));
    dispatch(getJobHistories({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.hireDate = convertDateTimeToServer(values.hireDate);
    if (values.salary !== undefined && typeof values.salary !== 'number') {
      values.salary = Number(values.salary);
    }
    if (values.commissionPct !== undefined && typeof values.commissionPct !== 'number') {
      values.commissionPct = Number(values.commissionPct);
    }

    const entity = {
      ...employeeEntity,
      ...values,
      manager: employees.find(it => it.id.toString() === values.manager.toString()),
      department: departments.find(it => it.id.toString() === values.department.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          hireDate: displayDefaultDateTime(),
        }
      : {
          nationality: 'CAMEROON',
          typeEmployed: 'MARKETER',
          ...employeeEntity,
          hireDate: convertDateTimeFromServer(employeeEntity.hireDate),
          manager: employeeEntity?.manager?.id,
          department: employeeEntity?.department?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="vcrmApp.employee.home.createOrEditLabel" data-cy="EmployeeCreateUpdateHeading">
            <Translate contentKey="vcrmApp.employee.home.createOrEditLabel">Create or edit a Employee</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="employee-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('vcrmApp.employee.firstName')}
                id="employee-firstName"
                name="firstName"
                data-cy="firstName"
                type="text"
              />
              <UncontrolledTooltip target="firstNameLabel">
                <Translate contentKey="vcrmApp.employee.help.firstName" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('vcrmApp.employee.lastName')}
                id="employee-lastName"
                name="lastName"
                data-cy="lastName"
                type="text"
              />
              <ValidatedField label={translate('vcrmApp.employee.email')} id="employee-email" name="email" data-cy="email" type="text" />
              <ValidatedField
                label={translate('vcrmApp.employee.phoneNumber')}
                id="employee-phoneNumber"
                name="phoneNumber"
                data-cy="phoneNumber"
                type="text"
              />
              <ValidatedField
                label={translate('vcrmApp.employee.identityCard')}
                id="employee-identityCard"
                name="identityCard"
                data-cy="identityCard"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('vcrmApp.employee.dateInspiration')}
                id="employee-dateInspiration"
                name="dateInspiration"
                data-cy="dateInspiration"
                type="text"
              />
              <ValidatedField
                label={translate('vcrmApp.employee.nationality')}
                id="employee-nationality"
                name="nationality"
                data-cy="nationality"
                type="select"
              >
                {paysValues.map(pays => (
                  <option value={pays} key={pays}>
                    {translate('vcrmApp.Pays.' + pays)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedBlobField
                label={translate('vcrmApp.employee.uploadIdentityCard')}
                id="employee-uploadIdentityCard"
                name="uploadIdentityCard"
                data-cy="uploadIdentityCard"
                openActionLabel={translate('entity.action.open')}
                validate={{}}
              />
              <ValidatedField
                label={translate('vcrmApp.employee.companyName')}
                id="employee-companyName"
                name="companyName"
                data-cy="companyName"
                type="text"
              />
              <ValidatedField
                label={translate('vcrmApp.employee.typeEmployed')}
                id="employee-typeEmployed"
                name="typeEmployed"
                data-cy="typeEmployed"
                type="select"
              >
                {typeEmployedValues.map(typeEmployed => (
                  <option value={typeEmployed} key={typeEmployed}>
                    {translate('vcrmApp.TypeEmployed.' + typeEmployed)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('vcrmApp.employee.hireDate')}
                id="employee-hireDate"
                name="hireDate"
                data-cy="hireDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('vcrmApp.employee.salary')}
                id="employee-salary"
                name="salary"
                data-cy="salary"
                type="text"
              />
              <ValidatedField
                label={translate('vcrmApp.employee.commissionPct')}
                id="employee-commissionPct"
                name="commissionPct"
                data-cy="commissionPct"
                type="text"
              />
              <ValidatedField
                id="employee-manager"
                name="manager"
                data-cy="manager"
                label={translate('vcrmApp.employee.manager')}
                type="select"
              >
                <option value="" key="0" />
                {employees
                  ? employees.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="employee-department"
                name="department"
                data-cy="department"
                label={translate('vcrmApp.employee.department')}
                type="select"
              >
                <option value="" key="0" />
                {departments
                  ? departments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/employee" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeUpdate;
