import {Template} from "../../models/template";
import {TemplateDto} from "../../models/dto/template-dto";

export interface ITemplateRepository {
    getTemplates(search?: string): Promise<TemplateDto[]>;
    createTemplate(template: Template): Promise<Template>;
    getTemplate(id: number): Promise<Template>;
}
