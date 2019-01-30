/**
 * @license
 * Copyright 2017 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation} from "@angular/core";
import {Oas20SchemaDefinition, Oas30SchemaDefinition} from "oai-ts-core";
import {createChangePropertyCommand, ICommand} from "oai-ts-commands";
import {CommandService} from "../../../_services/command.service";
import {AbstractBaseComponent} from "../../common/base-component";
import {DocumentService} from "../../../_services/document.service";
import {SelectionService} from "../../../_services/selection.service";
import {ModelUtils} from "../../../_util/model.util";


@Component({
    moduleId: module.id,
    selector: "definition-example-section",
    templateUrl: "example-section.component.html",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefinitionExampleSectionComponent extends AbstractBaseComponent {

    @Input() definition: Oas20SchemaDefinition | Oas30SchemaDefinition;

    constructor(private changeDetectorRef: ChangeDetectorRef, private documentService: DocumentService,
                private commandService: CommandService, private selectionService: SelectionService) {
        super(changeDetectorRef, documentService, selectionService);
    }

    /**
     * returns the example.
     */
    public example(): string {
        return this.definition.example;
    }

    /**
     * Called when the user changes the example.
     * @param newExample
     */
    public onExampleChange(newExample: string): void {
        console.info("[DefinitionExampleSectionComponent] User changed the data type example.");
        let command: ICommand = createChangePropertyCommand(this.definition.ownerDocument(), this.definition,
            "example", newExample);
        this.commandService.emit(command);
    }
    
    public exampleNodePath(): string {
        return ModelUtils.nodeToPath(this.definition) + "/example";
    }

}
