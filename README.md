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

The auto generated HTML Code is:
```html
<table>
  <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>surname</th>
      <th>category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Federico</td>
      <td>Grande</td>
      <td>Developer</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Matteo</td>
      <td>Tassoni</td>
      <td>Developer</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Silvia</td>
      <td>Buccelli</td>
      <td>Useless</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Mario</td>
      <td>Rossi</td>
      <td>Other</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Napoleone</td>
      <td>Bonaparte</td>
      <td>Other</td>
    </tr>
  </tbody>
  <tfoot>
  </tfoot>
</table>
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
|customField|Object|Add custom column with buttons. All of properties of this object must exist!|

**Config.tableSetting.caption**
```js
Config.tableSetting.caption: {
    value: "Personal Data",
    attr: { 
        class: "caption-class", 
        id: "caption-id" 
    } 
};
```
Generate:
```html
<caption class="caption-class" id="caption-id">Personal Data</caption>
```

**Config.tableSetting.attr**
```js
Config.tableSetting.attr: {
    class: "table-class", 
    id: "table-id" 
};
```
Generate:
```html
<table class="table-class" id="table-id">
  ...
</table>
```

**Config.tableSetting.colgroup**
```js
Config.tableSetting.colgroup: [
    {span: 1, style: "background-color:red;"},
    {span: 2, style: "background-color:blue;"},
    ...
];
```
Generate:
```html
<colgroup>
  <col span="1" style="background-color:red;">
  <col span="2" style="background-color:blue;">
</colgroup>
```

**Config.tableSetting.multipleTbody**

Adding this property, you can divide elements in multiple `<tbody></tbody>` according to the chosen `Config.tableSetting.multipleTbody.filter`. The value of `Config.tableSetting.multipleTbody.filter` it must be equal to a key of one object belonging to objArray
```js
//Take this dataset
var objArray: [
  {id: 1, name: "Federico", surname: "Grande", category: "Developer"}, 
  {id: 2, name: "Matteo", surname: "Tassoni", category: "Developer"}, 
  {id: 3, name: "Silvia", surname: "Buccelli", category: "Useless"},
  {id: 4, name: "Mario", surname: "Rossi", category: "Other"},
  {id: 5, name: "Napoleone", surname: "Bonaparte", category: "Other"}
];

Config.tableSetting.multipleTbody: {
    filter: "category"
};
```
In this case, with `Config.tableSetting.multipleTbody.filter = "category"`, you generate the following code
```html
<table>
  <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>surname</th>
      <th>category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Federico</td>
      <td>Grande</td>
      <td>Developer</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Matteo</td>
      <td>Tassoni</td>
      <td>Developer</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>3</td>
      <td>Silvia</td>
      <td>Buccelli</td>
      <td>Useless</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>4</td>
      <td>Mario</td>
      <td>Rossi</td>
      <td>Other</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Napoleone</td>
      <td>Bonaparte</td>
      <td>Other</td>
    </tr>
  </tbody>
  <tfoot>
  </tfoot>
</table>
```
Morover, if you want to generate a description row for each `<tbody></tbody>`, add `Config.tableSetting.multipleTbody.rowDescriptor.class` property.
```js
Config.tableSetting.multipleTbody: {
    filter: "category",
    rowDescriptor: {
        class: "row-descriptor-class"
    }
};
```
The result is:
```html
<table>
  <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>surname</th>
      <th>category</th>
    </tr>
  </thead>
  <tbody>
    <tr>          
      <td class="row-descriptor-class" colspan="4">Developer</td>
    </tr>
    <tr>
      <td>1</td>
      <td>Federico</td>
      <td>Grande</td>
      <td>Developer</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Matteo</td>
      <td>Tassoni</td>
      <td>Developer</td>
    </tr>
  </tbody>
  <tbody>
    <tr>          
      <td class="row-descriptor-class" colspan="4">Useless</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Silvia</td>
      <td>Buccelli</td>
      <td>Useless</td>
    </tr>
  </tbody>
  <tbody>
    <tr>          
      <td class="row-descriptor-class" colspan="4">Other</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Mario</td>
      <td>Rossi</td>
      <td>Other</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Napoleone</td>
      <td>Bonaparte</td>
      <td>Other</td>
    </tr>
  </tbody>
  <tfoot>
  </tfoot>
</table>
```

**Config.tableSetting.theadClass**
```js
Config.tableSetting.theadClass: "thead-class";
```
The code above add class to `<thead></thead>` tag:
```html
<thead class="thead-class">
  ...
</thead>
```

**Config.tableSetting.tbodyBaseClass**
```js
Config.tableSetting.tbodyBaseClass: "tbody-class";
```
The code above add class to `<tbody></tbody>` tag (if `multipleTbody` is active, add this class to all `<tbody></tbody>` tags):
```html
<tbody class="tbody-class">
  ...
</tbody>
```

**Config.tableSetting.customField**

You can add custom column with dynamic `<td></td>` where you can build some active buttons to operate with other external functions.

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
`Config.tableSetting.customField.title` is the header of new column.

`Config.tableSetting.customField.key` is the *primary key* of rows (it must be a key of an object belonging to objArray)

`Config.tableSetting.customField.buttons` array accept object with following properties:

|Name|Type|Description|
|:---:|:---:|:---:|
|id|String|Add id like `id-${keyValue}`, where `keyValue` is value of key of row|
|class|String|Add class to button|
|label|String|Add label to button (it can be HTML Code also)|
|event|String|Add one HTML5 event to the element|
|callback|Function|Add callback to recall when event occurs. Callback pass as first parameter caller HTML element (`this`). The second parameter is `key` value of row|

If `Config.tableSetting.customField.buttons.event` exists, then `Config.tableSetting.customField.buttons.callback` must exist also.

The following code describe a new dynamic `<td></td>` (with configuration describes above):
```html
<td class="custom-class-custom-field-body-cell">
    <button id="btn-update-0" class="btn-class-update" onclick="javascript:updateRow(this, 1);">Update</button><button id="btn-del-0" class="btn-class-delete" onclick="javascript:deleteRow(this, 1);">Delete</button>
</td>
```
This `<td></td>` element is associated to the `<tr></tr>` with the key equal to 1 (in this case is the value of `<th>id</th>` column).
