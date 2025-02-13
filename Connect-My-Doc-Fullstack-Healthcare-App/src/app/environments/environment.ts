
interface ApiPaths {
  [key: string]: {
    [key: string]: string;
  };
}

interface Services {
  [key: string]: string;
}

export const environment = {
  production: false,
  sentryDsn : 'https://83d8fb7e6276f9585124a732946a4673@o4508759768760320.ingest.us.sentry.io/4508759772299264',

  baseApiUrl: 'http://localhost:8080/api',
  baseApiUrlClinic:'http://localhost:8085/api/Clinic',
  baseApiUrlAppointments:'http://localhost:8089/api',

  // baseApiUrl: 'https://cmd-doctors-be-service.azurewebsites.net/api',
  // baseApiUrlClinic:'https://cmd-clinic-be-service.azurewebsites.net/api/Clinic',
  // baseApiUrlAppointments:'https://cmd-appointments-be-service.azurewebsites.net/api',

  services: {
    appointments: '/appointments',
    clinics: '/clinics',
    doctors: '/doctors',
    doctorSchedule: '/doctorschedule',
    patients: '/patients',
    masterdata: '/masterdata',
  } as Services,

  apiPaths: {
    doctors: {
      getDoctorById: '/get-doctor-by-Id/',
      getAllDoctors: '/get-all-doctors',
      createDoctor: '/addDoctor',
      updateDoctorAddress: '/update-doctor-address/',
      updateDoctorExperience: '/update-doctor-experience/',
      deleteDoctor: '/delete-doctor/',
    },
    doctorSchedule:{
      createSchedule:'/add-schedule',
      getAllSchedules:'/get-all-doctor-schedules',
      getScheduleById:'/get-schedule-by-Id/',
      updateDoctorSchedule:'/update-doctor-schedule/',
      deleteDoctorSchedule:'/delete-doctor-schedule/'
    },
    patients: {
      getPatientById: '/{id}',
      getAllPatients: '/all',
      registerPatient: '/register',
    },
    clinics: {
      getClinicById: '/{id}',
      getAllClinics: '/all',
      createClinic: '/create',
    },
    appointments: {
      createAppointment: '/create',
      getAppointmentsByDoctor: '/doctor/{doctorId}',
      getAppointmentsByPatient: '/patient/{patientId}',
      getAllAppointments:'/get-all-appointments'
    },
    authentication: {
      login: '/login',
      register: '/register',
      logout: '/logout',
    },
    masterdata: {
      getSpecializations: '/specializations',
      getDepartments: '/departments',
    },
    diagnostics: {
      bookService: '/book',
      getAvailableServices: '/services',
    },
  } as ApiPaths,
};
