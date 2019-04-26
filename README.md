# table-builder
Build one table in Javascpript with no other dependencies.

## Quick Start
Dowload TableBuilder.js file and include in html code

```html
<!-- Include TableBuilder.js file -->
<script src="TableBuilder.js"></script>
```

**Build table with minimal configuration**

```html
<script>
  //Object format
  var objArray = [
    {id: 1, name: "Federico", surname: "Grande", category: "Developer"}, 
    {id: 2, name: "Matteo", surname: "Tassoni", category: "Developer"}, 
    {id: 3, name: "Silvia", surname: "Buccelli", category: "Useless"},
    {id: 4, name: "Mario", surname: "Rossi", category: "Other"},
    {id: 5, name: "Napoleone", surname: "Bonaparte", category: "Other"}
  ];
  
  //Configuration variable
  var Config = {
    data: objArray
    }
  };
  
  //Function BuildTable(Config) return generated html of table full of data
  var table = BuildTable(Config);
</script>
```

## Config Object Structure
The Object `var Config` can be defined in advanced way:
```js
//Configuration variable
  var Config = {
    data: objArray,
    tableCols: [],
    tableSetting: {}
  };
```

### Config.tableSetting structure

|Name|Type|Description|
|:---:|:---:|:---:|
|caption|Object|Add caption to table. You can add `caption.attr` property to describe better the style of caption|
|attr|Object|Describe class and/or id of table|
|colgroup|Array|Add `<colgroup></colgroup>` tag to describe table|
|multipleTbody|Object|Build different `<tbody></tbody>` element according to `multipleTbody.filter` property. You can add `rowDescriptor` property to build one row of description (in this case you must add `rowDescriptor.class`)|
|theadClass|String|Add class to `<thead></thead>` element|
|tbodyBaseClass|String|Add class to `<tbody></tbody>` element|
|customField|Object|Add custom column with buttons. All of properties of this object must be exist|

**Config.tableSetting.caption**
```js
Config.tableSetting.caption: {
    value: "Dati Anagrafici",
    attr: { 
        class: "caption-class", 
        id: "caption-id" 
    } 
};
```

**Config.tableSetting.attr**
```js
Config.tableSetting.attr: {
    class: "table-class", 
    id: "table-id" 
};
```

**Config.tableSetting.colgroup**
```js
Config.tableSetting.colgroup: [
    {span: 1, style: "background-color:red;"},
    {span: 2, style: "background-color:blue;"},
    ...
];
```

**Config.tableSetting.multipleTbody**
```js
Config.tableSetting.multipleTbody: {
    filter: "category",
    rowDescriptor: {
        class: "row-descriptor-class"
    }
};
```

**Config.tableSetting.theadClass**
```js
Config.tableSetting.theadClass: "thead-class";
```

**Config.tableSetting.tbodyBaseClass**
```js
Config.tableSetting.tbodyBaseClass: "tbody-class";
```

**Config.tableSetting.customField**
```js
function updateRow(obj, id) {
    console.log("Update", obj, "Key of row --> " + id);
}

function deleteRow(obj, id) {
    console.log("Delete", obj, "Key of row --> " + id);
}

Config.tableSetting.customField: {
    title: "Custom Column",
    key: "id",
    buttons: [
        {id: "btn-update", class: "btn-class-update", label: "Update", event: "onClick", callback: updateRow},
        {id: "btn-del", class: "btn-class-delete", label: "Delete", event: "onClick", callback: deleteRow}
    ]
};
```
