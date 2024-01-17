package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class EmployeeTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Employee getEmployeeSample1() {
        return new Employee()
            .id(1L)
            .firstName("firstName1")
            .lastName("lastName1")
            .email("email1")
            .phoneNumber("phoneNumber1")
            .identityCard("identityCard1")
            .dateInspiration("dateInspiration1")
            .companyName("companyName1")
            .salary(1L)
            .commissionPct(1L);
    }

    public static Employee getEmployeeSample2() {
        return new Employee()
            .id(2L)
            .firstName("firstName2")
            .lastName("lastName2")
            .email("email2")
            .phoneNumber("phoneNumber2")
            .identityCard("identityCard2")
            .dateInspiration("dateInspiration2")
            .companyName("companyName2")
            .salary(2L)
            .commissionPct(2L);
    }

    public static Employee getEmployeeRandomSampleGenerator() {
        return new Employee()
            .id(longCount.incrementAndGet())
            .firstName(UUID.randomUUID().toString())
            .lastName(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .phoneNumber(UUID.randomUUID().toString())
            .identityCard(UUID.randomUUID().toString())
            .dateInspiration(UUID.randomUUID().toString())
            .companyName(UUID.randomUUID().toString())
            .salary(longCount.incrementAndGet())
            .commissionPct(longCount.incrementAndGet());
    }
}
