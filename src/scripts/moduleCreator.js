"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
// Function to create a module with dynamic files
var createModule = function (moduleName) {
    var baseDir = path_1.default.join(__dirname, '../', 'app', 'modules', moduleName);
    console.log(__dirname, ' dir name');
    // List of files to be created
    var files = [
        "".concat(moduleName, ".routes.ts"),
        "".concat(moduleName, ".controller.ts"),
        "".concat(moduleName, ".model.ts"),
        "".concat(moduleName, ".service.ts"),
        "".concat(moduleName, ".interface.ts"),
        "".concat(moduleName, ".validation.ts"),
    ];
    // Create the module directory
    if (!fs_1.default.existsSync(baseDir)) {
        fs_1.default.mkdirSync(baseDir, { recursive: true });
        console.log("Directory created: ".concat(baseDir));
    }
    else {
        console.log("Directory already exists: ".concat(baseDir));
    }
    // Create each file with basic content
    files.forEach(function (file) {
        var filePath = path_1.default.join(baseDir, file);
        if (!fs_1.default.existsSync(filePath)) {
            var content = '';
            // Basic template for each file
            if (file.endsWith('.routes.ts')) {
                content = "import { Router } from 'express';\nimport { ".concat(moduleName, "Controller } from './").concat(moduleName, ".controller';\n\nconst router = Router();\n\n// Define routes\nrouter.get('/', ").concat(moduleName, "Controller.getAll);\n\nexport default router;\n");
            }
            else if (file.endsWith('.controller.ts')) {
                content = "import { Request, Response } from 'express';\nimport { ".concat(moduleName, "Service } from './").concat(moduleName, ".service';\n\nexport const ").concat(moduleName, "Controller = {\n  async getAll(req: Request, res: Response) {\n    const data = await ").concat(moduleName, "Service.getAll();\n    res.json(data);\n  },\n};\n");
            }
            else if (file.endsWith('.service.ts')) {
                content = "export const ".concat(moduleName, "Service = {\n  async getAll() {\n    // Example service logic\n    return [{ message: 'Service logic here' }];\n  },\n};\n");
            }
            else if (file.endsWith('.interface.ts')) {
                content = "export interface I".concat(capitalize(moduleName), " {\n  id: string;\n  name: string;\n}\n");
            }
            else if (file.endsWith('.validation.ts')) {
                content = "import { z } from 'zod';\n\nexport const ".concat(moduleName, "Validation = {\n  create: z.object({\n    name: z.string().min(1, 'Name is required'),\n  }),\n  update: z.object({\n    id: z.string().uuid('Invalid ID format'),\n    name: z.string().optional(),\n  }),\n};\n");
            }
            else if (file.endsWith('.model.ts')) {
                // Template for the model.ts file
                content = "import { Schema, model, Document } from 'mongoose';\n\nexport interface I".concat(capitalize(moduleName), "Model extends Document {\n  name: string;\n  // add more fields here\n}\n\nconst ").concat(moduleName, "Schema = new Schema<I").concat(capitalize(moduleName), "Model>({\n  name: { type: String, required: true },\n  // add more fields here\n});\n\nconst ").concat(moduleName, "Model = model<I").concat(capitalize(moduleName), "Model>('").concat(capitalize(moduleName), "', ").concat(moduleName, "Schema);\n\nexport default ").concat(moduleName, "Model;\n");
            }
            fs_1.default.writeFileSync(filePath, content, 'utf-8');
            console.log("File created: ".concat(filePath));
        }
        else {
            console.log("File already exists: ".concat(filePath));
        }
    });
};
// Utility function to capitalize the module name
var capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
// Get the module name from command-line arguments
var moduleName = process.argv[2];
if (!moduleName) {
    console.error('Please provide a module name.');
    process.exit(1);
}
// Execute the function
createModule(moduleName);
