---
sidebar_position: 8
---

# ⚠️ MQTT

## Well known UUIDs

<WellKnownUUID type='Application' name='MQTT Permission Template' 
    uuid='1266ddf1-156c-4266-9808-d6949418b185'
    description='Expands a permission recognised by the MQTT plugin to an MQTT ACL.'/>

UUIDs representing MQTT permissions need to have a Config Store entry of
this type. This entry serves as a template for the MQTT permissions
granted when the given permission UUID is granted in the Auth service.

The entry **MUST** be a JSON object. Keys represent MQTT topics; values
represent the access granted to that topic. Values **MUST** be strings,
as defined below.

Topic names support the normal MQTT `+` and `#` wildcards. In addition,
if any of the percent sequences below appear in the topic name, the
`target` of the relevant ACE will be looked up under the 'Sparkplug
Address' application below. The percent sequence will be expanded to the
relevant property of the entry returned. If there is no such entry the
topic will be ignored (no permission will be granted).

| Sequence | Property |
|---|---|
| `%g` | `group_id` |
| `%n` | `node_id` |

The access granted is specified as a string containing one or more of
the characters below.

| Access | Meaning |
|---|---|
| `r` | Read data published to the given topic. |
| `w` | Publish to the given topic. |
| `s` | Allow subscription to the given topic. |

The `s` code is intended for implementations that distinguish between
'subscribe' and 'read' permissions. A client granted `s` permission
**SHOULD** be allowed to request subscription to the given topic, but
**MUST NOT** be sent packets for that topic unless `r` permission is
also granted.

Not all implementations will implement the `s` permission.
Implementations that do not **MAY** refuse subscription requests for
topics that do not have `r` permission. Currently the ACS HiveMQ plugin
does not implement `s`.

<WellKnownUUID type='Application' name='Sparkplug Address Information'
    uuid='8e32801b-f35a-4cbf-a5c3-2af64d3debd7'
    description='The Sparkplug address used by an object.'/>

This Application is described more fully in the Config Store
specification.
