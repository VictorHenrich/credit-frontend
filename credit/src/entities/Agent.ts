import UserEntity from "./User";

export default interface AgentEntity extends UserEntity{
    name: string;
    documentCPF: string;
}