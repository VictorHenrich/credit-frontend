import UserEntity from "./User";
import { ModelEntity } from "./common";

export default interface AgentEntity extends UserEntity, ModelEntity{
    name: string;
    documentCPF: string;
}