package linhtran.it.vnua.sale.service;

import linhtran.it.vnua.sale.entities.Employee;
import linhtran.it.vnua.sale.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by linhtran on 04/10/17.
 */

@Service
@Transactional
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public  Employee findOne(long id) {
        return this.employeeRepository.findOne(id);
    }
}
