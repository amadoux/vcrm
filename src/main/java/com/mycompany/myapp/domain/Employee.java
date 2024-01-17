package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.Pays;
import com.mycompany.myapp.domain.enumeration.TypeEmployed;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * The Employee entity.
 */
@Schema(description = "The Employee entity.")
@Entity
@Table(name = "employee")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    /**
     * The firstname attribute.
     */
    @Schema(description = "The firstname attribute.")
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @NotNull
    @Column(name = "identity_card", nullable = false)
    private String identityCard;

    @Column(name = "date_inspiration")
    private String dateInspiration;

    @Enumerated(EnumType.STRING)
    @Column(name = "nationality")
    private Pays nationality;

    @Lob
    @Column(name = "upload_identity_card")
    private byte[] uploadIdentityCard;

    @Column(name = "upload_identity_card_content_type")
    private String uploadIdentityCardContentType;

    @Column(name = "company_name")
    private String companyName;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_employed")
    private TypeEmployed typeEmployed;

    @Column(name = "hire_date")
    private Instant hireDate;

    @Column(name = "salary")
    private Long salary;

    @Column(name = "commission_pct")
    private Long commissionPct;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "employee")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "tasks", "employee", "jobHistory" }, allowSetters = true)
    private Set<Job> jobs = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "jobs", "manager", "department", "jobHistory" }, allowSetters = true)
    private Employee manager;

    /**
     * Another side of the same relationship
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "location", "employees", "jobHistory" }, allowSetters = true)
    private Department department;

    @JsonIgnoreProperties(value = { "job", "department", "employee" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "employee")
    private JobHistory jobHistory;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Employee id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Employee firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public Employee lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public Employee email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public Employee phoneNumber(String phoneNumber) {
        this.setPhoneNumber(phoneNumber);
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getIdentityCard() {
        return this.identityCard;
    }

    public Employee identityCard(String identityCard) {
        this.setIdentityCard(identityCard);
        return this;
    }

    public void setIdentityCard(String identityCard) {
        this.identityCard = identityCard;
    }

    public String getDateInspiration() {
        return this.dateInspiration;
    }

    public Employee dateInspiration(String dateInspiration) {
        this.setDateInspiration(dateInspiration);
        return this;
    }

    public void setDateInspiration(String dateInspiration) {
        this.dateInspiration = dateInspiration;
    }

    public Pays getNationality() {
        return this.nationality;
    }

    public Employee nationality(Pays nationality) {
        this.setNationality(nationality);
        return this;
    }

    public void setNationality(Pays nationality) {
        this.nationality = nationality;
    }

    public byte[] getUploadIdentityCard() {
        return this.uploadIdentityCard;
    }

    public Employee uploadIdentityCard(byte[] uploadIdentityCard) {
        this.setUploadIdentityCard(uploadIdentityCard);
        return this;
    }

    public void setUploadIdentityCard(byte[] uploadIdentityCard) {
        this.uploadIdentityCard = uploadIdentityCard;
    }

    public String getUploadIdentityCardContentType() {
        return this.uploadIdentityCardContentType;
    }

    public Employee uploadIdentityCardContentType(String uploadIdentityCardContentType) {
        this.uploadIdentityCardContentType = uploadIdentityCardContentType;
        return this;
    }

    public void setUploadIdentityCardContentType(String uploadIdentityCardContentType) {
        this.uploadIdentityCardContentType = uploadIdentityCardContentType;
    }

    public String getCompanyName() {
        return this.companyName;
    }

    public Employee companyName(String companyName) {
        this.setCompanyName(companyName);
        return this;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public TypeEmployed getTypeEmployed() {
        return this.typeEmployed;
    }

    public Employee typeEmployed(TypeEmployed typeEmployed) {
        this.setTypeEmployed(typeEmployed);
        return this;
    }

    public void setTypeEmployed(TypeEmployed typeEmployed) {
        this.typeEmployed = typeEmployed;
    }

    public Instant getHireDate() {
        return this.hireDate;
    }

    public Employee hireDate(Instant hireDate) {
        this.setHireDate(hireDate);
        return this;
    }

    public void setHireDate(Instant hireDate) {
        this.hireDate = hireDate;
    }

    public Long getSalary() {
        return this.salary;
    }

    public Employee salary(Long salary) {
        this.setSalary(salary);
        return this;
    }

    public void setSalary(Long salary) {
        this.salary = salary;
    }

    public Long getCommissionPct() {
        return this.commissionPct;
    }

    public Employee commissionPct(Long commissionPct) {
        this.setCommissionPct(commissionPct);
        return this;
    }

    public void setCommissionPct(Long commissionPct) {
        this.commissionPct = commissionPct;
    }

    public Set<Job> getJobs() {
        return this.jobs;
    }

    public void setJobs(Set<Job> jobs) {
        if (this.jobs != null) {
            this.jobs.forEach(i -> i.setEmployee(null));
        }
        if (jobs != null) {
            jobs.forEach(i -> i.setEmployee(this));
        }
        this.jobs = jobs;
    }

    public Employee jobs(Set<Job> jobs) {
        this.setJobs(jobs);
        return this;
    }

    public Employee addJob(Job job) {
        this.jobs.add(job);
        job.setEmployee(this);
        return this;
    }

    public Employee removeJob(Job job) {
        this.jobs.remove(job);
        job.setEmployee(null);
        return this;
    }

    public Employee getManager() {
        return this.manager;
    }

    public void setManager(Employee employee) {
        this.manager = employee;
    }

    public Employee manager(Employee employee) {
        this.setManager(employee);
        return this;
    }

    public Department getDepartment() {
        return this.department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Employee department(Department department) {
        this.setDepartment(department);
        return this;
    }

    public JobHistory getJobHistory() {
        return this.jobHistory;
    }

    public void setJobHistory(JobHistory jobHistory) {
        if (this.jobHistory != null) {
            this.jobHistory.setEmployee(null);
        }
        if (jobHistory != null) {
            jobHistory.setEmployee(this);
        }
        this.jobHistory = jobHistory;
    }

    public Employee jobHistory(JobHistory jobHistory) {
        this.setJobHistory(jobHistory);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return getId() != null && getId().equals(((Employee) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", identityCard='" + getIdentityCard() + "'" +
            ", dateInspiration='" + getDateInspiration() + "'" +
            ", nationality='" + getNationality() + "'" +
            ", uploadIdentityCard='" + getUploadIdentityCard() + "'" +
            ", uploadIdentityCardContentType='" + getUploadIdentityCardContentType() + "'" +
            ", companyName='" + getCompanyName() + "'" +
            ", typeEmployed='" + getTypeEmployed() + "'" +
            ", hireDate='" + getHireDate() + "'" +
            ", salary=" + getSalary() +
            ", commissionPct=" + getCommissionPct() +
            "}";
    }
}
