import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './employee.reducer';

export const EmployeeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const employeeEntity = useAppSelector(state => state.employee.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="employeeDetailsHeading">
          <Translate contentKey="vcrmApp.employee.detail.title">Employee</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.id}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="vcrmApp.employee.firstName">First Name</Translate>
            </span>
            <UncontrolledTooltip target="firstName">
              <Translate contentKey="vcrmApp.employee.help.firstName" />
            </UncontrolledTooltip>
          </dt>
          <dd>{employeeEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="vcrmApp.employee.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="vcrmApp.employee.email">Email</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.email}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="vcrmApp.employee.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.phoneNumber}</dd>
          <dt>
            <span id="identityCard">
              <Translate contentKey="vcrmApp.employee.identityCard">Identity Card</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.identityCard}</dd>
          <dt>
            <span id="dateInspiration">
              <Translate contentKey="vcrmApp.employee.dateInspiration">Date Inspiration</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.dateInspiration}</dd>
          <dt>
            <span id="nationality">
              <Translate contentKey="vcrmApp.employee.nationality">Nationality</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.nationality}</dd>
          <dt>
            <span id="uploadIdentityCard">
              <Translate contentKey="vcrmApp.employee.uploadIdentityCard">Upload Identity Card</Translate>
            </span>
          </dt>
          <dd>
            {employeeEntity.uploadIdentityCard ? (
              <div>
                {employeeEntity.uploadIdentityCardContentType ? (
                  <a onClick={openFile(employeeEntity.uploadIdentityCardContentType, employeeEntity.uploadIdentityCard)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {employeeEntity.uploadIdentityCardContentType}, {byteSize(employeeEntity.uploadIdentityCard)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="companyName">
              <Translate contentKey="vcrmApp.employee.companyName">Company Name</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.companyName}</dd>
          <dt>
            <span id="typeEmployed">
              <Translate contentKey="vcrmApp.employee.typeEmployed">Type Employed</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.typeEmployed}</dd>
          <dt>
            <span id="hireDate">
              <Translate contentKey="vcrmApp.employee.hireDate">Hire Date</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.hireDate ? <TextFormat value={employeeEntity.hireDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="salary">
              <Translate contentKey="vcrmApp.employee.salary">Salary</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.salary}</dd>
          <dt>
            <span id="commissionPct">
              <Translate contentKey="vcrmApp.employee.commissionPct">Commission Pct</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.commissionPct}</dd>
          <dt>
            <Translate contentKey="vcrmApp.employee.manager">Manager</Translate>
          </dt>
          <dd>{employeeEntity.manager ? employeeEntity.manager.id : ''}</dd>
          <dt>
            <Translate contentKey="vcrmApp.employee.department">Department</Translate>
          </dt>
          <dd>{employeeEntity.department ? employeeEntity.department.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee/${employeeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EmployeeDetail;
