import dayjs from 'dayjs';
import { IJob } from 'app/shared/model/job.model';
import { IDepartment } from 'app/shared/model/department.model';
import { IJobHistory } from 'app/shared/model/job-history.model';
import { Pays } from 'app/shared/model/enumerations/pays.model';
import { TypeEmployed } from 'app/shared/model/enumerations/type-employed.model';

export interface IEmployee {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  identityCard?: string;
  dateInspiration?: string | null;
  nationality?: keyof typeof Pays | null;
  uploadIdentityCardContentType?: string | null;
  uploadIdentityCard?: string | null;
  companyName?: string | null;
  typeEmployed?: keyof typeof TypeEmployed | null;
  hireDate?: dayjs.Dayjs | null;
  salary?: number | null;
  commissionPct?: number | null;
  jobs?: IJob[] | null;
  manager?: IEmployee | null;
  department?: IDepartment | null;
  jobHistory?: IJobHistory | null;
}

export const defaultValue: Readonly<IEmployee> = {};
