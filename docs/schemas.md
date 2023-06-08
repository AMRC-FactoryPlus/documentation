---
sidebar_position: 4
---

# Data Schemas

Without proper context and structure, the data collected by a smart factory is useless. Connecting multiple types and variants of devices to a common architecture poses a challenge due to the significant variation in data structures and naming schemes. To address this issue, Factory+ includes a Data Schema specification that allows new or existing models to be represented across the framework in a modular, reusable, consistent and well-understood format. This ensures that the data is gathered in a standardised manner and eliminates the need for manual data processing.

It is important to acknowledge that although Factory+ Schemas allow for the creation of new models, their purpose is not to replace the modelling efforts of existing specifications such as OPC UA Companion Specifications or MTConnect. Instead, the Schema definition provides guidelines for how model files should be represented, using JSONSchema, without dictating the specific content of those models. The AMRC has also developed a small collection of models that are utilised internally and [have been released as open-source resources](https://github.com/AMRC-FactoryPlus/schemas).

## Factory+ Schema Specification

Factory+ Schemas make use of [JSON Schema](https://json-schema.org/) version [2020-12](https://json-schema.org/draft/2020-12/schema), a vocabulary that
enforces the structure and enables the validation of JSON documents. JSON Schema was selected as the means to represent the Factory+ data models due to its
extensibility, modular nature, reusability and widespread adoption. By utilising JSON Schema and the Factory+ Schema Specification a completely re-usable library of manufacturing component 'building blocks' can be created to extensively represent devices.

Factory+ schemas must adhere to the following:
- All schemas **MUST** use the `https://json-schema.org/draft/2020-12/schema` version of JSON Schema.
- All schemas **MUST** have a `title` field that defines the type of object that the schema represents (e.g. `Robotic Object`).
- All schemas **MUST** use an integer version number to control the schema version. Breaking changes to the schema **MUST
  ** increment this number.
- All schemas **MUST
  ** have a filename in the format `<name>-v<version>.json` (e.g. `Robot-v1.json`) where `<name>` consists only of alphanumeric characters and the underscore (`_`) character.
- All schemas **MUST** have an `$id` property that represents the URL of the stored schema and **MUST
  ** be in the format `<URL>-v<version>.json` (e.g. `https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Common/Robot-v1.json`).
- All schemas **MUST** have a unique [`Schema_UUID`](/docs/schemas#schema-uuids) property that represents a unique reference to this schema.
- All schemas **MUST** declare an `Instance_UUID` property that allows instances to declare their own unique identification. Keeping track of this information permits devices to be physically relocated (which subsequently changes their Sparkplug address) whilst maintaining their identity across the architecture.
- All schemas **MUST** declare the `Schema_UUID` and `Instance_UUID` properties as required.
- All schemas **MUST** use [composition over inheritance](/docs/schemas#composition-vs-inheritance).
- Metric names within schemas **MUST** only use alphanumeric characters and the underscore (`_`) character.
- Metric names within schemas **MUST NOT** conflict with folders containing metrics (e.g. A metric named `Foo` **MUST NOT
  ** exist if a folder named `Foo/Bar` exists).
- Metrics **MUST
  ** consist of an `allOf` with the first element being a reference to the `Metric-v1` schema and the second element being a properties object that sets the `Documentation` and `Sparkplug_Type` properties for the metric. See [below](#representing-sparkplug-metrics) for an example.
- All instances of objects **MUST** have a unique `Instance_UUID` property that represents a unique reference to the instantiated object.
- All birth certificates must have a top-level `uuid` field set to `11ad7b32-1d32-4c4a-b0c9-fa049208939a`, identifying the packet as a Factory+ sparkplug payload.

An example schema is given below for a robotic system, which demonstrates how importing existing schemas and exploiting the features of JSON Schema results in a simple, concise model.

More information on the specifics of Factory+ Schemas such as [how metrics are defined](#representing-sparkplug-metrics) and [how to import and reuse other schemas](#reusability) is covered in the sections below.

```json
{
  "$id": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Robot/Robot-v1.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Robotic Object",
  "type": "object",
  "properties": {
    "Schema_UUID": {
      "const": "6012580d-fd0a-442c-8d71-7f315s155633"
    },
    "Instance_UUID": {
      "description": "The unique identifier for this object. (A UUID specified by RFC4122).",
      "type": "string",
      "format": "uuid"
    },
    "Controller_UUID": {
      "allOf": [
        {
          "$ref": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Common/Metric-v1.json"
        },
        {
          "properties": {
            "Sparkplug_Type": {
              "enum": [
                "UUID"
              ]
            },
            "Documentation": {
              "default": "A reference to the controller that this robot uses"
            }
          }
        }
      ]
    },
    "Device_Information": {
      "$ref": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Common/Device_Information-v1.json"
    },
    "Axes": {
      "type": "object",
      "patternProperties": {
        "^[a-zA-Z0-9_]*$": {
          "$comment": "An axis name or identifier - can be any regular string",
          "$ref": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Common/Axis-v1.json"
        }
      }
    },
    "End_Effectors": {
      "type": "object",
      "patternProperties": {
        "^[a-zA-Z0-9_]*$": {
          "$comment": "An end effector position identifier",
          "$ref": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Common/End_Effector-v1.json"
        }
      }
    }
  },
  "required": [
    "Schema_UUID",
    "Instance_UUID",
    "Device_Information",
    "Axes"
  ]
}
```

### Schema UUIDs

Every schema must contain a unique `Schema_UUID` property that is used to identify the schema when parsing instances. It must be represented by a RFC4122 UUID string and placed at the top of the `properties` object on the Schema.

When a new schema is created it must be manually assigned a v4 UUID. UUIDs can be generated using whatever tooling is available, however online tools such as https://www.uuidgenerator.net/ are useful if none are available.

```json
{
  "$id": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Robot/Robot-v1.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Robotic Object",
  "type": "object",
  "properties": {
    "Schema_UUID": {
      "const": "6012580d-fd0a-442c-8d71-7f315s155633"
    }
  }
}
```

### Reusability

Let's suppose that we have developed a standard `Axis` schema for use within our organisation that includes metrics like `Axis_Type`, `Actual_Position` and `Actual_Angle` as seen below.

```json
{
  "$id": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Common/Axis-v1.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Common Axis Object",
  "type": "object",
  "properties": {
    "Schema_UUID": {
      "const": "777dd941-f426-4355-8130-e144530b1376"
    },
    "Instance_UUID": {
      "description": "The unique identifier for this object. (A UUID specified by RFC4122).",
      "type": "string",
      "format": "uuid"
    },
    "Axis_Type": {
      ...
    },
    "Actual_Position": {
      ...
    },
    "Actual_Angle": {
      ...
    }
  },
  "required": [
    "Schema_UUID",
    "Instance_UUID",
    "Axis_Type"
  ]
}
```

The above schema is now the standard representation of an axis for the organisation and can be used in other schemas that contain axes. For example, below is an extract from the AMRC's robot schema that utilises the `Axis-v1` schema. It defines how a robot can have a number of axes under the `Axes` folder, each of which must conform to the above axis definition.

```json
{
  "$id": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Robot/Robot-v1.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Robotic Object",
  "type": "object",
  "properties": {
    "Schema_UUID": {
      "const": "6012580d-fd0a-442c-8d71-7f31f7155633"
    },
    "Instance_UUID": {
      "description": "The unique identifier for this object. (A UUID specified by RFC4122).",
      "type": "string",
      "format": "uuid"
    },
    "Axes": {
      "type": "object",
      "patternProperties": {
        "^[a-zA-Z0-9_]*$": {
          "$comment": "An axis name or identifier - can be any regular string",
          "$ref": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Common/Axis-v1.json"
        }
      }
    }
  },
  "required": [
    "Schema_UUID",
    "Instance_UUID",
    "Axes"
  ]
}
```

It should be noted that the `array` type is not used within Factory+ schemas and instead lists of objects are represented by objects with the keys representing the object name. In the above example, the regex `^[a-zA-Z0-9_]*$` key of `patternProperties` ensures that the names of each axis conforms to alphanumeric characters.

:::info Schema Hosting
For the Robot schema above to be able to resolve the Axis schema, the Axis schema must be hosted at the location of its own `$id`.
:::

#### Composition vs. Inheritance

Factory+ schemas are ultimately describing not JSON documents but Sparkplug birth certificates, which must contain a `Schema_UUID` to ensure that data-consuming applications can interpret the content without consulting an external schema resolution service. Consequently, a single birth certificate may contain multiple `Schema_UUID` properties at various levels in the metric hierarchy, indicating the various schemas used to construct the final data model.

Due to this constraint, utilising JSON Schema inheritance (indicated by allOf) in the typical manner is unfeasible when both the primary and secondary schemas possess `Schema_UUID`s. If `allOf` is employed as intended, only one of the two UUIDs can be placed in the `Schema_UUID` parameter, causing consuming applications to be incapable of searching for devices using Schema UUID, as not all of them would be available. To avert this issue, Factory+ schemas are required to adopt composition rather than inheritance.

Let's use an example to demonstrate this principal. The Axis schema outlined above may be suitable to be used directly by many other schemas (robots, CNC, etc.) but occasionally other schemas may want to add additional properties to the axis schema. For example, a 3D printer may want to add properties specific to a 3D printer axis such as `Racking_Error` and `Following_Error`. To achieve this, composition must be utilised.

The below schema represents a 3D printer Axis that adds the above additional properties via composition. It includes a reference to the standard axis schema within a `Base_Axis` object and adds the additional properties as siblings.

```json
{
  "$id": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/3D_Printer/Axis-v1.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "3D Printer Axis",
  "description": "A JSON Schema representation of an Axis object of a 3D Printer.",
  "type": "object",
  "properties": {
    "Schema_UUID": {
      "const": "3cd41716-a07f-4951-9111-d822092230f8"
    },
    "Base_Axis": {
      "$ref": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Common/Axis-v1.json"
    },
    "Racking_Error": {
      ...
    },
    "Following_Error": {
      ...
    }
  },
  "required": [
    "Base_Axis"
  ]
}

```

### Representing Sparkplug Metrics

Up to this point the metric objects in the example schemas above have been represented as `{...}` for simplification. Sparkplug metrics are the lowest level of schema within Factory+ and represent a physical metric within a birth certificate.

```json
{
  "Motor_Current": {
    "allOf": [
      {
        "$ref": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Common/Metric-v1.json"
      },
      {
        "properties": {
          "Sparkplug_Type": {
            "enum": [
              "FloatBE"
            ]
          },
          "Documentation": {
            "default": "Current applied in Amps to the axis motor."
          }
        }
      }
    ]
  }
}
```

Metrics consist of a few key elements. The first thing to note is that the whole metric is wrapped in an `allOf` property, with the first
element being a reference to the `Metric-v1` schema. The second element in the `allOf` effectively
_overwrites_ the properties in the Metric, enabling further refinement for things like `Sparkplug_Type`, `Documentation` and limiting the values to a predefined set of options. So, in the example above, the `Motor_Current` metric must be a `FloatBE` and has documentation set to provide context for the metric.

The `Metric-v1` schema that the metric uses includes all properties required for a metric to be represented on Factory+.

```json
{
  "$id": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Common/Metric-v1.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "Schema_UUID": {
      "const": "b16275f1-e443-4c41-a482-fcbdfbd20769"
    },
    "Value": {
      "title": "Value of the metric",
      "description": "The static value for fixed metrics or the initial value for dynamic metrics.",
      "$comment": "Data type: As specified in DataType column",
      "type": "string",
      "examples": [
        "Setting a numerical value 100",
        "or a boolean value FALSE",
        "or a static string such as manually entering a robot serial number RoBoT5678"
      ]
    },
    "Sparkplug_Type": {
      "title": "Sparkplug Type",
      "description": "The Sparkplug data type of the underlying metric.",
      "$comment": "Data type of metric from the types included in the Sparkplug specification (see https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Common/Types/Sparkplug_Types.json)",
      "$ref": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Common/Types/Sparkplug_Types-v1.json"
    },
    "Method": {
      "title": "Method",
      "description": "The method used to obtain the value of the metric. Use REST style syntax for all protocols - GET for read-only outputs and static values and PUT for inputs or write operations.",
      "$comment": "Metric interaction method(s). 1) For REST: Use GET, PUT, POST, DELETE methods as required. Multiple methods for a single metric can be indicated using comma separated combinations. 2) Use REST style syntax for other protocols too: GET for read-only outputs and static values and PUT for inputs or write operations.",
      "type": "string",
      "enum": [
        "GET",
        "PUT",
        "POST",
        "DELETE",
        "GET,POST"
      ],
      "default": "GET"
    },
    "Address": {
      "title": "Metric Address",
      "description": "This Metric Address field together with the Metric Path field uniquely identifies how to access a specific metric value from a device. The structure of this field (and of the Metric Path field) is determined by the protocol being used: 1) Fieldbus: Database memory address given as %aa####.* where aa is replaced by letters which determine the type of variable (eg. boolean input I and output Q, byte IB and QB, word IW and QW, and double word ID and QD). #### is replaced by digits representing the byte number of the metric and * by a digit representing the bit number. 2) REST: Path following the domain in a REST call URL. If using REST to access data from MiR AGVs, the data will be returned in JSON format. One complication here is that recursive function calls may be required to obtain the required data. For example, to obtain whether a robot is 'active' or not, you need to first run the GET /robots command to return a list of robots together with URLs that will provide more data for each robot. Then, using the URLs, another command of the form GET /robots/robot_id needs to be requested and this will return a more detailed JSON response where one of the metrics will be the 'active' status. So the active status of a robot first requires the output from another request for the list of robot URLs. In such cases, the notation to use is of the form <PathToList,IdentifiersJsonPath>, where PathToList should be replaced by the REST endpoint to the list of items (in our example /robots) and IdentifiersJsonPath should use JSONPath notation (for more information see the Metric Path Section below) for a list of all identifiers ($..url). The translation app will then cache the data available from each robot's URL in the list of robots and return the available variables for each (one of which is the 'active' status ). 3) MTConnect: This also uses REST as the protocol but will return a response in the form of XML rather than JSON. Again we must specify the path following the domain in a REST call URL and most of the live data for MTConnect devices can be accessed using /current . 4) OpenProtocol (SmartTools): The OpenProtocol MID number and the revision of the MID in the form mid****rev### where **** is replaced by the 4 digits representing the MID of the message and ### is replaced by the 3 digits representing the revision of the MID. 5) Other: TBD",
      "type": "string",
      "examples": [
        "Fieldbus: %QD1026 or %Q1194.0",
        "OPC UA: ns=2;s=/Channel/Spindle/actSpeed",
        "REST:/status or for recursive calls </robots,$..url>",
        "MTConnect: /current",
        "MQTT: /robot01/axis/1/position",
        "OpenProtocol (SmartTools): mid0040rev001",
        "Other: TBD"
      ]
    },
    "Path": {
      "title": "Metric Path",
      "description": "This Metric Path field together with the Metric Address field uniquely identifies how to access a specific metric value from a device. The structure of this field (and of the Metric Address field) is determined by the message format. If the returned value is in JSON format, JSONPath notation should be used to uniquely identify the metric. The JSONPath starts with a $ and each child element is separated by a '.'. For the XML format and there is a standard notation to query XML data called XPath (analogous to JSONPath). The notation recommended here is to use the select all operator //* and then identify a specific metric by searching for a specific attribute name [@attributeName=\"test\"]. To obtain the text content (actual data values) of an XML node, we can use /text() at the end of the attribute query. In some cases (such as MTConnect Conditions) it may be required to obtain the name of the XML node (eg. Normal, Warning or Fault for an MTConnect Condition) itself rather than just the text associated with the node. Here, we must use local-name() and place the attribute query within the parenthesis. Note: appending /local-name() to the end of the attribute query will not work. Leave blank for protocols where the value is returned plain.",
      "type": "string",
      "examples": [
        "Protocol Specific (OPC UA, Fieldbus): leave empty",
        "JSON: $.status.errors.code or to return a metric from the first value in an array $[0].state",
        "XML: x-axis position: //*[@componentId='x']//*[@dataItemId='xp']/text(), hydraulic condition: local-name(//*[@componentId='hydraulic']//*[@dataItemId='hyd']), message associated with the hydraulic condition://*[@componentId='hydraulic']//*[@dataItemId='hyd']/text()",
        "Other: TBD"
      ]
    },
    "Eng_Unit": {
      "$ref": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Common/Units/Eng_Units-v1.json",
      "description": "Unit associated with the metric. The notation used for the unit must be as specified by the DisplayName of the OPC UA Engineering units (this is an extensive list of available units, and following the OPC notation will prevent duplication or ambiguity of units). Can leave this empty to signify that a unit is not applicable to the metric.",
      "examples": [
        "mm",
        "rad",
        "%",
        "°",
        "m/s",
        "°C"
      ]
    },
    "Eng_Low": {
      "title": "Engineering Low Limit",
      "description": "Metric minimum possible value, for example, the hardware limit.",
      "$comment": "Data type: As specified in Sparkplug_Type field",
      "type": "number",
      "examples": [
        0,
        -100.0
      ]
    },
    "Eng_High": {
      "title": "Engineering High Limit",
      "description": "Metric maximum possible value, for example, the hardware limit.",
      "$comment": "Data type: As specified in Sparkplug_Type field",
      "type": "number",
      "examples": [
        1,
        100.0
      ]
    },
    "Deadband": {
      "title": "Deadband",
      "description": "Numerical value used to prevent unnecessary updates for metrics whose values float by small amounts. If a metric value has changed by less than the deadband amount, the metric will not be updated to the new value. Particularly useful for metrics that frequently fluctuate by a small amount.",
      "$comment": "Data type: 1) Float - For specifying absolute value change. 2) Float with % symbol - For specifying percentage change based on Eng_Low and Eng_High. Eng_Low and Eng_High values are required for this mode.",
      "type": "string",
      "examples": [
        "3.75",
        "1.5%"
      ]
    },
    "Tooltip": {
      "title": "Tooltip",
      "description": "Short metric description that will display as a Tooltip when hovering over the metric. Can be simple text or could try and include more context such as enum value definitions.",
      "type": "string",
      "examples": [
        "Spindle Speed"
      ]
    },
    "Documentation": {
      "title": "Documentation",
      "description": "More detailed metric description, possibly including links to manuals. It should to try to provide enough context so that an uninvolved reader could understand what is being stored for this metric.",
      "type": "string",
      "examples": [
        "The current name of the fleet"
      ]
    },
    "Record_To_Historian": {
      "title": "Record to Historian",
      "description": "Indicates if metric values will be recorded to the Factory+ Historian.",
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "Sparkplug_Type",
    "Record_To_Historian"
  ]
}
```

## Example

The following simple but complete schema example for a Cell has been included for completeness and to help demonstrate the concepts explained in this specification.

```json
{
  "$id": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Cell/Cell-v1.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Cell",
  "type": "object",
  "properties": {
    "Schema_UUID": {
      "const": "aa8f98ad-2c6e-4fef-86d1-f01b576b35ed"
    },
    "Instance_UUID": {
      "description": "The unique identifier for this object. (A UUID specified by RFC4122).",
      "type": "string",
      "format": "uuid"
    },
    "Safety": {
      "type": "object",
      "properties": {
        "Emergency_Stops": {
          "type": "object",
          "patternProperties": {
            "^[a-zA-Z0-9_]*$": {
              "$ref": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Cell/Emergency_Stop-v1.json"
            }
          }
        },
        "Protective_Stops": {
          "type": "object",
          "patternProperties": {
            "^[a-zA-Z0-9_]*$": {
              "$ref": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Cell/Protective_Stop-v1.json"
            }
          }
        }
      }
    }
  },
  "required": [
    "Schema_UUID",
    "Instance_UUID"
  ]
}
```

An example device configuration that validates against this schema is shown below.

```json
{
  "$schema": "https://raw.githubusercontent.com/AMRC-FactoryPlus/schemas/main/Cell-v1.json",
  "Schema_UUID": "aa8f98ad-2c6e-4fef-86d1-f01b576b35ed",
  "Instance_UUID": "eb54002e-ec01-4761-8bc3-563d44fed4c1",
  "Safety": {
    "Protective_Stops": {
      "Protective_Stop_1": {
        "Schema_UUID": "24a01fa5-9232-40f5-98e5-0414e383ba9d",
        "Instance_UUID": "b949fab1-db25-44c3-8d14-90b3371c757b",
        "Active": {
          "Sparkplug_Type": "Boolean",
          "Method": "GET",
          "Address": "/path",
          "Path": "//*[@componentId='cell']//*[@dataItemId='ps1']/text()",
          "Record_To_Historian": true
        }
      }
    },
    "Emergency_Stops": {
      "Emergency_Stop_1": {
        "Schema_UUID": "1a1ef094-bbf4-4f15-a63d-5692ef13a9f1",
        "Instance_UUID": "179bad19-dd57-4ccc-9d3b-5ac4fc0a60f6",
        "Active": {
          "Sparkplug_Type": "Boolean",
          "Method": "GET",
          "Address": "/path",
          "Path": "//*[@componentId='cell']//*[@dataItemId='es1']/text()",
          "Record_To_Historian": true
        }
      }
    }
  }
}
```
