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

### Config.tableCols array structure

With this array you can describe columns of table. Let's start from this dataset:
```js
var objArray: [
  {id: 1, name: "Federico", surname: "Grande", category: "Developer"}, 
  {id: 2, name: "Matteo", surname: "Tassoni", category: "Developer"}, 
  {id: 3, name: "Silvia", surname: "Buccelli", category: "Useless"},
  {id: 4, name: "Mario", surname: "Rossi", category: "Other"},
  {id: 5, name: "Napoleone", surname: "Bonaparte", category: "Other"}
];
```
Then, the basic configuration of `Config.tableCols` is:
```js
Config.tableCols = [
  {id: {}}, 
  {name: {}}, 
  {surname: {}}, 
  {category: {}}
]
```
If `Config.tableCols` exists and it is an array with length > 0, then a table will be built with only columns written in `Config.tableCols`. With the last configuration of `Config.tableCols` you generate:
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

Otherwise, if `Config.tableCols` is:
```js
Config.tableCols = [
  {id: {}}, 
  {name: {}}
]
```
then generated HTML Code will be:
```html
<table>
  <thead>
    <tr>
      <th>id</th>
      <th>name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Federico</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Matteo</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Silvia</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Mario</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Napoleone</td>
    </tr>
  </tbody>
  <tfoot>
  </tfoot>
</table>
```

`Config.tableCols` array accept objects with a keys equal to one of the key of an object of objArray. The value of the key will be structured as follows (properties list):

|Name|Type|Description|
|:---:|:---:|:---:|
|title|String|Set header of column associated to the key|
|colspan|Number/Object|Set `<td colspan="x"></td>` or `<th colspan="x"></th>` of column associated to the key. If it is an object the structure is: `colspan: {thead: 1, tbody: 1}` (example)|
|class|String/Object|Set `<td class="y"></td>` or `<th class="x"></th>` of column associated to the key. If it is an object the structure is: `class: {thead: "x", tbody: "y"}` (example)|

Example:
```js
Config.tableCols = [
  {id: {title: "ID", colspan: { thead: 1 , tbody: 1 } , class: "id-dataset-cell"}}, 
  {name: {title: "Nome", colspan: 1 , class: { thead: "thead-name-cell" , tbody: "tbody-name-cell" }}}
]
```
then generated HTML Code will be:
```html
<table>
  <thead>
    <tr>
      <th class="id-dataset-cell" colspan="1"> ID </th>
      <th class="thead-name-cell" colspan="1"> Nome </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="id-dataset-cell" colspan="1"> 1 </td>
      <td class="tbody-name-cell" colspan="1"> Federico </td>
    </tr>
    <tr>
      <td class="id-dataset-cell" colspan="1"> 2 </td>
      <td class="tbody-name-cell" colspan="1"> Matteo </td>
    </tr>
    <tr>
      <td class="id-dataset-cell" colspan="1"> 3 </td>
      <td class="tbody-name-cell" colspan="1"> Silvia </td>
    </tr>
    <tr>
      <td class="id-dataset-cell" colspan="1"> 4 </td>
      <td class="tbody-name-cell" colspan="1"> Mario </td>
    </tr>
    <tr>
      <td class="id-dataset-cell" colspan="1"> 5 </td>
      <td class="tbody-name-cell" colspan="1"> Napoleone </td>
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
Config.tableSetting.caption = {
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
Config.tableSetting.attr = {
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
Config.tableSetting.colgroup = [
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

Config.tableSetting.multipleTbody = {
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
Config.tableSetting.multipleTbody = {
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
Config.tableSetting.theadClass = "thead-class";
```
The code above add class to `<thead></thead>` tag:
```html
<thead class="thead-class">
  ...
</thead>
```

**Config.tableSetting.tbodyBaseClass**
```js
Config.tableSetting.tbodyBaseClass = "tbody-class";
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

Config.tableSetting.customField = {
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
  <button id="btn-update-0" class="btn-class-update" onclick="javascript:updateRow(this, 1);">Update</button>
  <button id="btn-del-0" class="btn-class-delete" onclick="javascript:deleteRow(this, 1);">Delete</button>
</td>
```
This `<td></td>` element is associated to the `<tr></tr>` with the key equal to 1 (in this case is the value of `<th>id</th>` column).

## Advanced Example

Write Advanced configuration:
```html
<script>
  function updateRow(obj, id) {
    console.log("Update", obj, "Key of row --> " + id);
  }

  function deleteRow(obj, id) {
      console.log("Delete", obj, "Key of row --> " + id);
  }

  var objArray: [
    {id: 1, name: "Federico", surname: "Grande", category: "Developer"}, 
    {id: 2, name: "Matteo", surname: "Tassoni", category: "Developer"}, 
    {id: 3, name: "Silvia", surname: "Buccelli", category: "Useless"},
    {id: 4, name: "Mario", surname: "Rossi", category: "Other"},
    {id: 5, name: "Napoleone", surname: "Bonaparte", category: "Other"}
  ];

  var Config = {
    data: objArray,
    tableCols: [
      {id: {title: "ID", colspan: { thead: 1 , tbody: 1 } , class: "id-dataset-cell"}}, 
      {name: {title: "Nome", colspan: 1 , class: { thead: "thead-name-cell" , tbody: "tbody-name-cell" }}},
      {surname: { title: "Cognome", colspan: { thead: 1 , tbody: 1 } , class: { thead: "thead-surname-cell" , tbody: "tbody-surname-cell" }}},
    ],
    tableSetting: {
      caption: {
        value: "Personal data",
        attr: { 
            class: "caption-class", 
            id: "caption-id" 
        }
      },
      attr: {
        class: "table-class", 
        id: "table-id" 
      },
      colgroup: [
        {span: 1, style: "width:35%;"},
        {span: 2, style: "width: 25%;"}
      ],
      multipleTbody: {
        filter: "category",
        rowDescriptor: {
            class: "row-descriptor-class"
        }
      },
      theadClass: "thead-class",
      tbodyBaseClass: "tbody-class",
      customField: {
        title: "Custom Column",
        key: "id",
        buttons: [
            {id: "btn-update", class: "btn-class-update", label: "Update", event: "onClick", callback: updateRow},
            {id: "btn-del", class: "btn-class-delete", label: "Delete", event: "onClick", callback: deleteRow}
        ]
      }
    }
  };

  var table = BuildTable(Config);
</script>
```
HTML Code generated by this confguration will be:
```html
<table class="table-class" id="table-id">
  <caption class="caption-class" id="caption-id">Personal data</caption>
  <colgroup>
    <col span="1" style="width:35%;">
    <col span="2" style="width: 25%;">
  </colgroup>
  <thead class="thead-class">
    <tr>
      <th class="id-dataset-cell" colspan="1"> ID </th>
      <th class="thead-name-cell" colspan="1"> Nome </th>
      <th class="thead-surname-cell" colspan="1"> Cognome </th>
      <th class="custom-class-custom-field-head-cell"> Custom Column </th>
    </tr>
  </thead>
  <tbody class="tbody-class">
    <tr>
      <td class="row-descriptor-class" colspan="4"> Developer </td>
    </tr>
    <tr>
      <td class="id-dataset-cell" colspan="1"> 1 </td>
      <td class="tbody-name-cell" colspan="1"> Federico </td>
      <td class="tbody-surname-cell" colspan="1"> Grande </td>
      <td class="custom-class-custom-field-body-cell">
          <button id="btn-update-0" class="btn-class-update" onclick="javascript:updateRow(this, 1);">Update</button>
          <button id="btn-del-0" class="btn-class-delete" onclick="javascript:deleteRow(this, 1);">Delete</button>
      </td>
    </tr>
    <tr>
      <td class="id-dataset-cell" colspan="1"> 2 </td>
      <td class="tbody-name-cell" colspan="1"> Matteo </td>
      <td class="tbody-surname-cell" colspan="1"> Tassoni </td>
      <td class="custom-class-custom-field-body-cell">
          <button id="btn-update-1" class="btn-class-update" onclick="javascript:updateRow(this, 2);">Update</button>
          <button id="btn-del-1" class="btn-class-delete" onclick="javascript:deleteRow(this, 2);">Delete</button>
      </td>
    </tr>
  </tbody>
  <tbody class="tbody-class">
    <tr>
        <td class="row-descriptor-class" colspan="4"> Useless </td>
    </tr>
    <tr>
        <td class="id-dataset-cell" colspan="1"> 3 </td>
        <td class="tbody-name-cell" colspan="1"> Silvia </td>
        <td class="tbody-surname-cell" colspan="1"> Buccelli </td>
        <td class="custom-class-custom-field-body-cell">
            <button id="btn-update-2" class="btn-class-update" onclick="javascript:updateRow(this, 3);">Update</button>
            <button id="btn-del-2" class="btn-class-delete" onclick="javascript:deleteRow(this, 3);">Delete</button>
        </td>
    </tr>
  </tbody>
  <tbody class="tbody-class">
    <tr>
      <td class="row-descriptor-class" colspan="4"> Other </td>
    </tr>
    <tr>
      <td class="id-dataset-cell" colspan="1"> 4 </td>
      <td class="tbody-name-cell" colspan="1"> Mario </td>
      <td class="tbody-surname-cell" colspan="1"> Rossi </td>
      <td class="custom-class-custom-field-body-cell">
          <button id="btn-update-3" class="btn-class-update" onclick="javascript:updateRow(this, 4);">Update</button>
          <button id="btn-del-3" class="btn-class-delete" onclick="javascript:deleteRow(this, 4);">Delete</button>
      </td>
    </tr>
    <tr>
      <td class="id-dataset-cell" colspan="1"> 5 </td>
      <td class="tbody-name-cell" colspan="1"> Napoleone </td>
      <td class="tbody-surname-cell" colspan="1"> Bonaparte </td>
      <td class="custom-class-custom-field-body-cell">
          <button id="btn-update-4" class="btn-class-update" onclick="javascript:updateRow(this, 5);">Update</button>
          <button id="btn-del-4" class="btn-class-delete" onclick="javascript:deleteRow(this, 5);">Delete</button>
      </td>
    </tr>
  </tbody>
  <tfoot>
  </tfoot>
</table>
```
