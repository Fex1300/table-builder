/**
 * 
 * @param {Object} config Configuration object for table
 * @param {Object[]} config.data Array of object (return SQL schema)
 * @param {Object[]} config.tableCols Header of columns. Ex of structure: [ { id: { title: "ID", colspan: { thead: 1 , tbody: 1 } , class: { thead: "custom-class-head-cell" , tbody: "custom-class-body-cell" } } } , { name: {title: "Nome", colspan: 1 , class: "custom-class" } } ] 
 * @param {TableSetting} config.tableSetting Table setting object
 */
function BuildTable(config) {
    /**
     * 
     * @param {Number} status 
     * @param {String} message
     * 
     * @returns {ResponseError} Generate response error
     */
    function Error(status, message) {
        return {status: status, message: message};
    }

    /**
     * @param {Object} config Configuration object for table
     * @param {Object[]} config.data Array of object (return SQL schema)
     * @param {Object[]} config.tableCols Header of columns. Ex of structure: [ { id: { title: "ID", colspan: { thead: 1 , tbody: 1 } , class: { thead: "custom-class-head-cell" , tbody: "custom-class-body-cell" } } } , { name: {title: "Nome", colspan: 1 , class: "custom-class" } } ] 
     * @param {TableSetting} config.tableSetting Table setting object
     * 
     * @returns {ResponseError[]|Number} If there aren't errors, return 1
     */
    function CheckInitError(config) {
        /**
         * @type {ResponseError}
         */
        var error = []

        /**
         * Controls on tableSetting Object
         */
        if(typeof config.tableSetting !== "undefined" && Object.keys(config.tableSetting).length > 0) {
            if(typeof config.tableSetting.caption !== "undefined" && Object.keys(config.tableSetting.caption).length > 0) {
                if(typeof config.tableSetting.caption.value === "undefined") error.push(Error(-1, "Value of caption is undefined"));
            }
    
            if(typeof config.tableSetting.colgroup !== "undefined" && Object.keys(config.tableSetting.caption).length > 0) {
                config.tableSetting.colgroup.forEach((value, key) => {
                    if(typeof value.span === "undefined") error.push(Error(-2, "Value of colspan is undefined [Element " + key + "]"))
                });
            }
    
            if(typeof config.tableSetting !== "undefined" && Object.keys(config.tableSetting).length <= 0) {
                if(typeof config.tableSetting.multipleTbody !== "undefined" && Object.keys(config.tableSetting.multipleTbody).length <= 0) {
                    error.push(Error(-3, "Multiple <tbody></tbody> is active but is not well defined"));
                } else {                
                    if(typeof config.tableSetting.multipleTbody !== "undefined") {
                        if(typeof config.tableSetting.multipleTbody.filter === "undefined") error.push(Error(-4, "Multiple <tbody></tbody> is active but filter property is undefined"));
                        if(typeof config.tableSetting.multipleTbody.rowDescriptor === "undefined") {
                            error.push(Error(-5, "Multiple <tbody></tbody> is active but rowdescriptor property is undefined"));
                        } else {
                            if(typeof config.tableSetting.multipleTbody.rowDescriptor !== "boolean" && typeof config.tableSetting.multipleTbody.rowDescriptor !== "object") {
                                error.push(Error(-6, "Multiple <tbody></tbody> is active but rowdescriptor property it must be an object or boolean value"));
                            } else {
                                if(typeof config.tableSetting.multipleTbody.rowDescriptor.class !== "string") error.push(Error(-7, "Multiple <tbody></tbody> is active but class of rowdescriptor property it's not a string"));
                            }
                        }
                    }
                }
            }
        }

        /**
         * Controls on tableCols Object[]
         */
        if(typeof config.tableCols !== "undefined" && config.tableCols.length > 0) {
            config.tableCols.forEach((value, key) => {
                if(typeof value === "undefined") error.push(Error(-8, "Value of table columns array (second parameter of function) it's not object [Element " + key + "]"));
            });
        } else if(typeof config.tableCols !== "undefined" && config.tableCols.length <= 0) {
            config.tableCols = BuildDefaultTableCol(config.data[0]);
        } else {
            config.tableCols = BuildDefaultTableCol(config.data[0])
        }

        return error.length > 0 ? error : 1;
    }

    /**
     * 
     * @param {Object} objRow Object that rapresent one row of SQL return (set null if you want to build <thead></thead> parsed row) 
     */
    function BuildDefaultTableCol(objRow) {
        var tableCols = [];
        Object.keys(objRow).forEach((value, key) => {
            tableCols.push({[value]: {}});
        });

        return tableCols;
    }

    /**
     * Check if category exist in <tbody></tbody> list array
     * @param {String} category Category to search
     * @param {ComplexTbody[]} tbodyList List of <tbody></tbody> in ComplexTbody Format
     * 
     * @returns {Number|Boolean} Return key of <tbody></tbody> in list array of false if category <tbody></tbody> doesn't exist
     */
    function CheckCategoryTbodyExist(category, tbodyList) {
        var result = false;
        tbodyList.forEach((value, key) => {
            if(value.filter === category) result = key;
        });

        return result;
    }

    /**
     * 
     * @param {Object[]} tableCols Header of columns. Ex of structure: [ { id: { title: "ID", colspan: { thead: 1 , tbody: 1 } , class: { thead: "custom-class-head-cell" , tbody: "custom-class-body-cell" } } } , { name: {title: "Nome", colspan: 1 , class: "custom-class" } } ] 
     * 
     * @returns {Number} Return number of columns of table
     */
    function CountColumns(tableCols) {
        var count = 0;

        tableCols.forEach((col, key) => {
            //Colspan: c'è, non c'è, c'è ma è un oggetto, c'è ma è un numero
            var span = 1; //Colspan doesn't exist
            if(typeof col[Object.keys(col)[0]].colspan !== "undefined") { //If colspan property exist...
                if(typeof col[Object.keys(col)[0]].colspan === "object") { //... and is an object then...
                    span = col[Object.keys(col)[0]].colspan.tbody;
                }
                if(typeof col[Object.keys(col)[0]].colspan === "number") { //... and is a number then...
                    span = col[Object.keys(col)[0]].colspan;
                }
            }

            count += span;
        });

        return count;
    }

    /**
     * 
     * @param {Object} objRow Object that rapresent one row of SQL return (set null if you want to build <thead></thead> parsed row)
     * @param {Object[]} tableCols Header of columns. Ex of structure: [ { id: { title: "ID", colspan: { thead: 1 , tbody: 1 } , class: { thead: "custom-class-head-cell" , tbody: "custom-class-body-cell" } } } , { name: {title: "Nome", colspan: 1 , class: "custom-class" } } ] 
     * @param {String} cellType Tag of cells in this row. Ex: 'td', 'th'
     * 
     * @returns {Row} Return parsed table's row
     */
    function BuildParsedTableRow(objRow, tableCols, cellType) {
        /**
         * @type {Row}
         */
        var row = {
            content: cellType,
            cells: []
        };

        var cellGroupType = cellType === "th" ? "thead" : "tbody";

        tableCols.forEach((tableCol, index) => row.cells.push(BuildParsedTableCell(tableCol, (objRow === null ? (typeof tableCol[Object.keys(tableCol)[0]].title !== "undefined" ? tableCol[Object.keys(tableCol)[0]].title : Object.keys(tableCol)[0]) : objRow[Object.keys(tableCol)[0]]), cellGroupType)));
        
        return row;
    }

    /**
     * 
     * @param {Object} tableCol Ex: { id: { title: "ID", colspan: { thead: 1 , tbody: 1 } , class: { thead: "custom-class-head-cell" , tbody: "custom-class-body-cell" } } }
     * @param {String} value Value of cell
     * @param {String} cellGroupType Group type of cell ('tbody' or 'thead')
     * 
     * @returns {ParsedCell} Return parsed table row's cell 
     */
    function BuildParsedTableCell(tableCol, value, cellGroupType) {
        /**
         * @type {ParsedCell}
         */
        var cell = {
            field: Object.keys(tableCol)[0],
            label: typeof tableCol[Object.keys(tableCol)[0]].title !== "undefined" ? tableCol[Object.keys(tableCol)[0]].title : Object.keys(tableCol)[0],
            value: value
        };

        if(typeof tableCol[Object.keys(tableCol)[0]].class !== "undefined") {
            cell.class = typeof tableCol[Object.keys(tableCol)[0]].class === "string" ? tableCol[Object.keys(tableCol)[0]].class : tableCol[Object.keys(tableCol)[0]].class[cellGroupType];
        }

        if(typeof tableCol[Object.keys(tableCol)[0]].colspan !== "undefined") {
            cell.colspan = typeof tableCol[Object.keys(tableCol)[0]].colspan === "number" ? tableCol[Object.keys(tableCol)[0]].colspan : tableCol[Object.keys(tableCol)[0]].colspan[cellGroupType];
        }

        if(typeof tableCol[Object.keys(tableCol)[0]].rowspan !== "undefined") {
            cell.rowspan = tableCol[Object.keys(tableCol)[0]].rowspan;
        }

        return cell;
    }

    /**
     * 
     * @param {String} filter Filter that describe rows under this
     * @param {String} rowClass Class to assign at this row descriptor
     * @param {Number} colspan Number of columns have a table
     * 
     * @returns {Row} Return parsed row to add at the table
     */
    function BuildParsedRowDescriptor(filter, rowClass, colspan) {
        return BuildParsedTableRow({filterToBuildRowDescriptor: filter}, [ {filterToBuildRowDescriptor: { colspan: colspan, class: rowClass } } ], 'td');
    }
    
    /**
     * 
     * @param {Object} caption Html <caption></caption> builder
     * @param {String} caption.value Table's title
     * @param {Object} caption.attr List of attribute to add at <caption></caption> tag. Example: { id: "custom-id", class: "custom-class", data-ex: "data-example" }
     * 
     * @returns {String} Generated html of <caption></caption>
     */
    function CreateCaption(caption) {
        var html = ``;
        if(typeof caption.attr !== "undefined" && Object.keys(caption.attr).length > 0) {
            Object.keys(caption.attr).forEach((value, key) => {
                html += ` ${value}="${caption.attr[value]}"`;
            });
        }
        return `<caption${html}>${caption.value}</caption>`;
    }

    /**
     * 
     * @param {Object[]} colgroup Array of <col> object
     * @param {String} colgroup[].span Attribute span of <col>
     * @param {String} colgroup[].style Attribute style of <col>
     * 
     * @returns {String} Generated html of <colgroup></colgroup>
     */
    function CreateColgroup(colgroup) {
        var html = `<colgroup>`;
        colgroup.forEach((value, key) => {
            html += `<col span="${value.span}"${typeof value.style !== "undefined" ? ` style="${value.style}"` : ``}>`;
        });
        html += `</colgroup>`;

        return html;
    }

    /**
     * 
     * @param {Object[]} tableCols Header of columns. Ex of structure: [ { id: { title: "ID", colspan: { thead: 1 , tbody: 1 } , class: { thead: "custom-class-head-cell" , tbody: "custom-class-body-cell" } } } , { name: {title: "Nome", colspan: 1 , class: "custom-class" } } ]
     * 
     * @returns {TElem} Element <thead></thead> ready to built
     */
    function TheadParser(tableCols) {
        return {
            rows: [BuildParsedTableRow(null, tableCols, 'th')]
        };
    }

    /**
     * 
     * @param {TElem} parsedThead Parsed row ready to print
     * @param {String} theadClass Class of <thead></thead> tag
     * 
     * @returns {String} Html code to build <thead></thead>
     */
    function CreateThead(parsedThead, theadClass) {
        var html = `
            <thead${theadClass !== false ? ` class="${theadClass}"` : ``}>
        `;
        parsedThead.rows.forEach((row, key) => {
            html += `
                <tr>
            `;
            row.cells.forEach((cell, key) => {
                html += `
                    <${row.content}${typeof cell.class !== "undefined" ? ` class="${cell.class}"` : ``}${typeof cell.colspan !== "undefined" ? ` colspan="${cell.colspan}"` : ``}${typeof cell.rowspan !== "undefined" ? ` rowspan="${cell.rowspan}"` : ``}>
                        ${cell.value}
                    </${row.content}>
                `;
            });
            html += `
                </tr>
            `;
        });
        html += `
            </thead>
        `;

        return html;
    }

    /**
     * 
     * @param {Object[]} objArray Array of object (return SQL schema)
     * @param {Object[]} tableCols Header of columns. Ex of structure: [ { id: { title: "ID", colspan: { thead: 1 , tbody: 1 } , class: { thead: "custom-class-head-cell" , tbody: "custom-class-body-cell" } } } , { name: {title: "Nome", colspan: 1 , class: "custom-class" } } ]
     * @param {Object} multipleTbody Object multiple <tbody></tbody> descriptor. Pass false if you don't separete <tbody></tbody>
     * @param {String} multipleTbody.filter Field to filter to separate different tbody. It must be a key of objArray variable
     * @param {String} multipleTbody.rowDescriptor Add one row to describe this <tbody></tbody>
     * 
     * @returns {ComplexTbody[]} Return object or array of object contains multiple TElem definition
     */
    function TbodyParser(objArray, tableCols, multipleTbody) {
        /**
         * @type {ComplexTbody[]}
         */
        var tbodyList = [];

        if(typeof multipleTbody !== "object") {
            /**
             * @type {ComplexTbody}
             */
            var tempComplexTbody = {
                filter: false,
                tbody: {rows: []}
            };

            objArray.forEach((objRow, index) => tempComplexTbody.tbody.rows.push(BuildParsedTableRow(objRow, tableCols, 'td')));
            tbodyList.push(tempComplexTbody);
        } else {
            objArray.forEach((objRow, index) => {
                var x = CheckCategoryTbodyExist(objRow[multipleTbody.filter], tbodyList);

                if(x === false) {
                    /**
                     * @type {ComplexTbody}
                     */
                    var tempComplexTbody = {
                        filter: objRow[multipleTbody.filter],
                        tbody: {rows: []}
                    };
                    if(typeof multipleTbody.rowDescriptor === "object") {
                        tempComplexTbody.tbody.rows.push(BuildParsedRowDescriptor(objRow[multipleTbody.filter], multipleTbody.rowDescriptor.class, CountColumns(tableCols)));
                    }
                    tempComplexTbody.tbody.rows.push(BuildParsedTableRow(objRow, tableCols, 'td'));
                    tbodyList.push(tempComplexTbody);         
                } else {
                    tbodyList[x].tbody.rows.push(BuildParsedTableRow(objRow, tableCols, 'td'));
                }
            });
        }

        return tbodyList;
    }

    /**
     * 
     * @param {ComplexTbody[]} parsedTbody 
     * @param {String} tbodyClass Class of <tbody></tbody> tag
     * 
     * @returns {String}  Html code to build <tbody></tbody>
     */
    function CreateTbody(parsedTbody, tbodyClass) {
        var html = ``;
        parsedTbody.forEach((elem, key) => {
            html += `
                <tbody${tbodyClass !== false ? ` class="${tbodyClass}"` : ``}>
            `;

            elem.tbody.rows.forEach((row, key) => {
                html += `
                    <tr>
                `;
                row.cells.forEach((cell, key) => {
                    html += `
                        <${row.content}${typeof cell.class !== "undefined" ? ` class="${cell.class}"` : ``}${typeof cell.colspan !== "undefined" ? ` colspan="${cell.colspan}"` : ``}${typeof cell.rowspan !== "undefined" ? ` rowspan="${cell.rowspan}"` : ``}>
                            ${cell.value}
                        </${row.content}>
                    `;
                });
                html += `
                    </tr>
                `;
            });

            html += `
                </tbody>
            `;
        });      

        return html;
    }

    function TfootParser() {

    }

    function CreateTfoot() {
        var html = `
            <tfoot>

            </tfoot>
        `;

        return html;
    }

    var checkError = CheckInitError(config);
    if(typeof checkError !== "number") {
        checkError.forEach((value, key) => {
            console.log(value);
        });
        return ;
    }

    //Build table attribute string 
    var tableAttr = ``;
    if(typeof config.tableSetting !== "undefined" && Object.keys(config.tableSetting).length > 0) {
        if(typeof config.tableSetting.attr !== "undefined" && Object.keys(config.tableSetting.attr).length > 0) {
            Object.keys(config.tableSetting.attr).forEach((value, key) => {
                tableAttr += ` ${value}="${config.tableSetting.attr[value]}"`;
            });
        }
    }

    //Add custom field to table column 
    if(typeof config.tableSetting !== "undefined" && Object.keys(config.tableSetting).length > 0) {
        if(typeof config.tableSetting.customField !== "undefined" && typeof config.tableSetting.customField !== "boolean") {
            config.tableCols.push({
                customField: {title: config.tableSetting.customField.title, class: {thead: "custom-class-custom-field-head-cell", tbody: "custom-class-custom-field-body-cell"}}
            });
            config.data.forEach((obj, objKey) => {
                obj.customField = ``;
                config.tableSetting.customField.buttons.forEach((btn, btnKey) => {
                    var btnClass = typeof btn.class !== "undefined" && btn.class !== false ? ` class="${btn.class}"` : ``;
                    var btnId = typeof btn.id !== "undefined" && btn.id !== false ? ` id="${btn.id}-${objKey}"` : ``;
                    var btnEvent = (typeof btn.event !== "undefined" && btn.event !== false) && (typeof btn.callback !== "undefined" && btn.callback !== false) ? `${btn.event}="javascript:${btn.callback.name}(this, ${obj[config.tableSetting.customField.key]});"` : ``;
                    obj.customField += `<button${btnId}${btnClass}${btnEvent}>${btn.label}</button>`;
                });
            });
        }
    }

    var parsedThead = TheadParser(config.tableCols);
    var thead = CreateThead(parsedThead, (typeof config.tableSetting !== "undefined") ? ((typeof config.tableSetting.theadClass !== "undefined") ? config.tableSetting.theadClass : false) : false);
    var parsedTbody = TbodyParser(config.data, config.tableCols, (typeof config.tableSetting !== "undefined" && Object.keys(config.tableSetting).length > 0) ? (typeof config.tableSetting.multipleTbody !== "undefined" && Object.keys(config.tableSetting.multipleTbody).length > 0 ? config.tableSetting.multipleTbody : false ) : false);
    var tbody = CreateTbody(parsedTbody, (typeof config.tableSetting !== "undefined") ? ((typeof config.tableSetting.tbodyBaseClass !== "undefined") ? config.tableSetting.tbodyBaseClass : false) : false);
    var tfoot = CreateTfoot();

    var table = `
        <table${tableAttr}>
            ${typeof config.tableSetting !== "undefined" && Object.keys(config.tableSetting).length > 0 ? (typeof config.tableSetting.caption !== "undefined" && typeof config.tableSetting.caption !== "boolean") && Object.keys(config.tableSetting.caption).length > 0 ? CreateCaption(config.tableSetting.caption) : `` : ``}
            ${typeof config.tableSetting !== "undefined" && Object.keys(config.tableSetting).length > 0 ? (typeof config.tableSetting.colgroup !== "undefined" && typeof config.tableSetting.colgroup !== "boolean") && Object.keys(config.tableSetting.caption).length > 0 ? CreateColgroup(config.tableSetting.colgroup) : `` : ``}
            ${thead}
            ${tbody}
            ${tfoot}
        </table>
    `;

    return table;
}

/**
 * @typedef TableSetting
 * @type {Object}
 * @property {Object} caption Set table <caption></caption>
 * @property {String} caption.value Set value of <caption></caption> element
 * @property {Object} caption.attr Set list of attribute of <caption></caption element. Ex: { class: "caption-class", data-ex: "caption-data" }
 * @property {Object} attr List of attribute to associate at the <table></table> element. Ex: { class: "table-class", data-ex: "table-data" }
 * @property {Object[]} colgroup Add <colgroup></colgroup> definition
 * @property {Number} colgroup.span Add to <col> span attribute
 * @property {String} colgroup.class Add to <col> class attribute
 * @property {Object} multipleTbody Add multiple <tbody></tbody> setting
 * @property {String} multipleTbody.filter Filter <tbody></tbody> with this value. It must be the name of one key of objArray (first variable passed in function propertyeters)
 * @property {Object} multipleTbody.rowDescriptor Add row descriptor before new data set <tbody></tbody>
 * @property {Object} multipleTbody.rowDescriptor.class Add class to row descriptor
 * @property {String} theadClass Add class to <thead></thead>
 * @property {String} tbodyBaseClass Add class to <tbody></tbody>
 * @property {Object} customField Add custom column where you can inject custom html or buttons of "edit" and "delete" event
 * @property {String} customField.title Set title of custom column
 * @property {String} customField.key Set primary key of table
 * @property {Object[]} customField.buttons Set active buttons for custom field
 * @property {String} customField.buttons.id Set base id of buttons
 * @property {String} customField.buttons.class Set classes of buttons
 * @property {String} customField.buttons.label Set label of buttons
 * @property {String} customField.buttons.event Set required event to call callback function
 * @property {callbackEvent} customField.buttons.callback Set callback function
 */

/**
 * @typedef ParsedCell
 * @type {Object}
 * @property {String} label Column Table name
 * @property {String} value Value of cell print on screen
 * @property {String} field DB column contains value property
 * @property {String} class CSS class of cell
 * @property {Number} colspan Colspan of column
 * @property {Number} rowspan Rowspan
 */

/**
 * @typedef Row
 * @type {Object}
 * @property {String} content Tag foreach table row's cells
 * @property {ParsedCell[]} cells Array of parsed cells
 */

/**
 * @typedef TElem
 * @type {Object}
 * @property {Row[]} rows Array of parsed rows
 */

/**
 * @typedef ComplexTbody
 * @type {Object}
 * @property {String} filter Keyword title of <tbody></tbody>
 * @property  {TElem} tbody List of parsed <tbody></tbody> objects
 */

/**
 * @typedef ResponseError
 * @type {Object}
 * @property {Number} status Status of error code
 * @property {String} message Error message
 */

 /**
  * @callback callbackEvent
  * @param {Object} obj Caller object
  * @param {String|Number} key Key of row
  */