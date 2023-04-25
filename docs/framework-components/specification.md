---
sidebar_position: 2
---

# Component Specification

The Factory+ Component Specification establishes guidelines that both core and plugin components must follow.

:::info Open-Source Template
The AMRC has released an [open-source collection of Factory+ utilities](https://github.com/AMRC-FactoryPlus/utilities), which includes a [Factory+ Service Client](https://github.com/AMRC-FactoryPlus/utilities/blob/main/docs/service-client.md), designed to form a solid foundation when building services/components for Factory+.
:::

## UUID Requirements

In order for a component to establish contact with another component, it must be able to identify that component. To achieve this, each component is assigned a Universally Unique Identifier (UUID) that can be advertised by the component and searched for by other components.

## Interface Requirements

Factory+ components should provide a Sparkplug interface and a HTTP interface where appropriate.

The Sparkplug interface allows components to:
- Register themselves with the Directory component, enabling clients to discover and interact with the components.
- Provide asynchronous notifications to clients, which is particularly useful for real-time updates, status changes, or event-driven communication. As MQTT is a lightweight and low-latency protocol, it's well-suited for this purpose.

The HTTP interface is designed to handle bulk request-response communication that may not be suitable for transmission over multicast mediums like MQTT. This interface is particularly useful for:
- Transferring large amounts of data, such as files or complex data structures, which may be cumbersome or inefficient to send over MQTT.
- Providing synchronous request-response communication for clients that require immediate feedback or confirmation, such as when retrieving access control information or submitting large configuration updates.

### Sparkplug Interface

* A component **MUST** publish a birth certificate over MQTT. The birth certificate identifies the component and publishes the URL of the HTTP endpoint (`Service_URL`). Each birth certificate can register only one component function with the Directory component, regardless of whether the component is a Sparkplug Node or Device. If a single software process intends to provide multiple components, it can publish multiple Device birth certificates to achieve this.

* The component's birth certificate **MUST** adhere to the [Factory+ Schema specification](/docs/schemas). Specifically, the `uuid` field at the top level of the Sparkplug packet **MUST** be set exactly to the value `11ad7b32-1d32-4c4a-b0c9-fa049208939a`. Furthermore, the component **MUST** publish a `Schema_UUID` metric at the top level of the packet, with the value `05688a03-730e-4cda-9932-172e2c62e45c`, identifying this node as a component. This schema **MUST** include the following metrics:

  | Metric          | Type   | Required | Description                                           |
  |-----------------|--------|----------|-------------------------------------------------------|
  | `Schema_UUID`   | UUID   | Yes      | Identifies this as a Component                        |
  | `Instance_UUID` | UUID   | Yes      | Identifies this particular device                     |
  | `Service_UUID`  | UUID   | Yes      | Specifies the component function this device provides |
  | `Service_URL`   | String | Yes      | Publishes the URL of the HTTP interface               |
  | `Last_Changed`  | String | No       | Provides asynchronous change-notify channels          |

* The `Last_Changed` folder includes metrics that are published when a relevant change occurs. Typically, clients would need to query the component's HTTP API to determine the nature of the changes, but this folder eliminates the need for constant polling. The specific metrics provided under the `Last_Changed` folder and their corresponding representations are defined by individual component specifications.

### HTTP Interface

* The HTTP interface **SHOULD** be provided over HTTPS, and the published component URL **SHOULD** reflect this secure connection. If enabled, the certificate on the server **MUST** be verifiable by all expected clients to ensure secure communication.

* The HTTP interface URL does not have to point to the root of a server. When clients use component API paths, they must ensure that they properly incorporate any path components included in the published component URL. This consideration is crucial for accurately accessing and interacting with the component's resources and functionalities.

* All requests **SHOULD** require and **MUST** accept HTTP Basic Auth, utilising the [Identity](/docs/framework-components/core-components/identity) component to authenticate.

* Component API endpoints **SHOULD** use JSON for request and response bodies, unless there is a compelling reason to choose an alternative format.

* All component APIs **MUST** provide an endpoint `GET /ping` that responds to all authenticated clients with a JSON object containing the following properties:

  | Property  | Value                                                   |
  |-----------|---------------------------------------------------------|
  | `service` | The UUID of the component this URL provides             |
  | `device`  | The Device UUID of this component's Sparkplug interface |
  | `version` | A version number string                                 |

* This endpoint **MUST** send a `401` response status code to any client that is not authorised to access any other part of the API. This mechanism allows clients to verify that they possess valid credentials for accessing the component's resources and functionalities.