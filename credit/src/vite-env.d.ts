/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_EMPLOYEE_LOANS_PATH: string
    readonly VITE_EMPLOYEE_PROFILE_PATH: string
    readonly VITE_EMPLOYEE_MAIN_PATH: string
    readonly VITE_BASE_URL: string
    readonly VITE_EMPLOYEE_AUTH_URL: string
    readonly VITE_AGENT_AUTH_URL: string
    readonly VITE_REFRESH_TOKEN_DATA_NAME: string
    readonly VITE_TOKEN_DATA_NAME: string
    readonly VITE_REFRESH_TOKEN_URL: string
    readonly VITE_EMPLOYEE_CAPTURE_URL: string
    readonly VITE_AGENT_MAIN_PATH: string
    readonly VITE_AGENT_EMPLOYEES_PATH: string
    readonly VITE_AGENT_LOANS_PATH: string
    readonly VITE_HOME_PATH: string
    readonly VITE_LOGOUT_PATH: string
    readonly VITE_EMPLOYEE_LISTING_URL: string
    readonly VITE_LOAN_LISTING_URL: string
    readonly VITE_LOAN_CAPTURE_URL: string
    readonly VITE_LOAN_CREATION_URL: string
    readonly VITE_LOAN_UPDATE_URL: string
    readonly VITE_LOAN_EXCLUSION_URL: string
    readonly VITE_EMPLOYEE_CREATION_URL: string
    readonly VITE_EMPLOYEE_UPDATE_URL: string
    readonly VITE_EMPLOYEE_EXCLUSION_URL: string
    readonly VITE_EMPLOYEE_LOAN_LISTING_URL: string
    readonly VITE_EMPLOYEE_LOAN_CREATION_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }