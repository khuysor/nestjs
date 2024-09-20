import { Injectable } from '@nestjs/common';
import { ResultRep } from 'src/common/dto/result.dto';
import { CustomerRequest } from 'src/customer/dto/customer-request.dtp';
interface Customer {
  id: number;
  name: string;
  email: string;
}
@Injectable()
export class CustomerService {
  private datas: Customer[] = [
    {
      id: 1,
      name: 'kok',
      email: 'kok@email.com',
    },
    {
      id: 2,
      name: 'lola',
      email: 'lola@email.com',
    },
  ];

  async getAll() {
    return ResultRep.success(this.datas);
  }

  async getById(id: number) {
    const res = this.datas.filter((d) => d.id == id);
    if (res.length == 0) {
      return ResultRep.notfound();
    } else {
      return ResultRep.success(res);
    }
  }

  async getByName(name: string) {
    const res = this.datas.filter((d) => d.name.includes(name));
    console.log(res);
    if (res.length == 0) {
      return ResultRep.notfound();
    } else {
      return ResultRep.success(res);
    }
  }
  async save(customer: CustomerRequest) {
    const newCustomer: Customer = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    };
    this.datas = [...this.datas, newCustomer];
    return ResultRep.created();
  }
}
