# Model Design
---
## 1. Directory Structure

The models directory consists of a top level models directive, and a sub-directory for each of the models defined. The sub-directory name will be the name of the model, with 2 files in the directory:

```javascript
    ModelName/
        <modelName>Schema.js
        <modelName>Model.js
```

## 2. Directory naming convention

Each directory will have a `PascalCase` name, to mirror how models are defined in MongoDB. However,within the directory, files will be named according to the Javascript `camelCase` standard.

There are a minimum of 2 files required in each of the directories (modelName is name of the model in MongoDB):

* a `<modelName>Schema.js`, used to define the schema. Ouput from this file is a valid MongoDB Schema object.
* a `<modelName>Model.js`, used to implement DAO methods for the specific model, which is exported from the file encased in an object.

For an example of what the structure will look like, the result of defining a User model will look like the following:

```javasript
    models/
        index.js
        ...
        User/
            userSchema.js
            userModel.js
        OtherName/
            otherNameSchema.js
            otherNameModel.js
        ...
```
> This is a reference if manually setting up a model directory

# 3. Creating a New Model Directory & Accompying files
There are two options:
    
    a. Running: yarn dao:newModel --model <model>
>This scaffolds out all of the files/code

        -- or --

    b. Creating the Directories/Files and writing the boiler plate manually

## 3.1 Invoking Script to Scaffold
By running `yarn dao:newModel --model <model>` the predefined templates will construct the correct directory stucture and file format, as well as scaffold the boilerplate code. The boilder plate that is scaffolded upon this command pertains to basic CRUD operations. The naming convention is covered in section 2.

__This is the preffered method for creating new models__

## 3.2 Manual Creation
If manually creating the directory, please reference the naming conventions in Section 2.

Any additional functions should be added after the essential CRUD operations. This section should be donted by:

    /* Additional Functions */
