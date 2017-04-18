/***
Wrapper/Helper Class for datagrid based on jQuery Datatable Plugin
***/
var Datatable = function() {

    var tableOptions; // main options
    var dataTable; // datatable object
    var table; // actual table jquery object
    //var tableContainer; // actual table container object
    //var tableWrapper; // actual table wrapper jquery object
    var tableInitialized = false;
    var ajaxParams = {}; // set filter mode
    var the;

    /*
    var countSelectedRecords = function() {
        var selected = $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).size();
        var text = tableOptions.dataTable.language.metronicGroupActions;
        if (selected > 0) {
            $('.table-group-actions > span', tableWrapper).text(text.replace("_TOTAL_", selected));
        } else {
            $('.table-group-actions > span', tableWrapper).text("");
        }
    };
    */

    return {

        //main function to initiate the module
        init: function(options) {

            if (!$().dataTable) {
                return;
            }

            the = this;

            // default settings
            options = $.extend(true, {
                src: "", // actual table  
                filterApplyAction: "filter",
                filterCancelAction: "filter_cancel",
                resetGroupActionInputOnSuccess: true,
                loadingMessage: '加载中...',
                dataTable: {
                    "dom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-12'i><'col-md-12 center-block'p>>", // datatable layout
                    "lengthMenu": [
                        [10, 20, 50, 100, 150, -1],
                        [10, 20, 50, 100, 150, "所有"] // 设置每页显示记录数选项
                    ],
                    "pageLength": 10, // 默认每页显示的记录数
                    "searching": false, // 关闭自带的搜索栏
                    "language": { // 语言国际化设置

                    	"processing": '<img src="charisma_ui_components/img/ajax-loaders/ajax-loader-7.gif"/><span>&nbsp;&nbsp;正在获取数据，请稍后...</span>', 
                        "lengthMenu": "每页显示 _MENU_ 条",
                        "info": "当前第  _START_ - _END_ 条　共 _TOTAL_ 条",
                        "infoEmpty": "当前记录数为 0 ",
                        "emptyTable": "没有您要搜索的内容",
                        "zeroRecords": "没有您要搜索的内容",
                        "search": "搜索",
                        "infoFiltered": "",
                        "paginate": {
                            "previous": "上一页",
                            "next": "下一页",
                            "last": "尾页",
                            "first": "首页",
                            "page": "页",
                            "pageOf": "of"
                        }
                    },

                    "orderCellsTop": true,
                    "columnDefs": [{ // define columns sorting options(by default all columns are sortable extept the first checkbox column)
                        'orderable': false,
                        'targets': [0]
                    }],

                    "pagingType": "bootstrap", // pagination type(bootstrap, bootstrap_full_number or bootstrap_extended)
                    "autoWidth": false, // disable fixed width and enable fluid table
                    "processing": true, // DataTables载入数据时，是否显示进度条
                    "serverSide": true, // 是否启用服务器端数据导入（即服务端分页）

                    "ajax": { // define ajax settings
                        "url": "", // ajax URL
                        "type": "POST", // request type
                        "timeout": 20000,
                        "data": function(data) { // add request parameters before submit
                            $.each(ajaxParams, function(key, value) {
                                data[key] = value;
                            });
                        },
                        "dataSrc": function(res) { // Manipulate the data returned from the server
                            return res.data;
                        },
                        "error": function() { // handle general connection errors
                            if (tableOptions.onError) {
                                tableOptions.onError.call(undefined, the);
                            }
                        }
                    },

                    "drawCallback": function(oSettings) { // run some code on table redraw
                        if (tableInitialized === false) { // check if table has been initialized
                            tableInitialized = true; // set table initialized
                            table.show(); // display table
                        }
                        //countSelectedRecords(); // reset selected records indicator

                        // callback for ajax data load
                        if (tableOptions.onDataLoad) {
                            tableOptions.onDataLoad.call(undefined, the);
                        }
                    }
                }
            }, options);

            tableOptions = options;

            // create table's jquery object
            table = $(options.src);
            //tableContainer = table.parents(".table-container");
            /*
            // apply the special class that used to restyle the default datatable
            var tmp = $.fn.dataTableExt.oStdClasses;

            $.fn.dataTableExt.oStdClasses.sWrapper = $.fn.dataTableExt.oStdClasses.sWrapper + " dataTables_extended_wrapper";
            $.fn.dataTableExt.oStdClasses.sFilterInput = "form-control input-small input-sm input-inline";
            $.fn.dataTableExt.oStdClasses.sLengthSelect = "form-control input-xsmall input-sm input-inline";
            */
            // initialize a datatable
            dataTable = table.DataTable(options.dataTable);
            /*
            // revert back to default
            $.fn.dataTableExt.oStdClasses.sWrapper = tmp.sWrapper;
            $.fn.dataTableExt.oStdClasses.sFilterInput = tmp.sFilterInput;
            $.fn.dataTableExt.oStdClasses.sLengthSelect = tmp.sLengthSelect;

            // get table wrapper
            tableWrapper = table.parents('.dataTables_wrapper');

            // build table group actions panel
            if ($('.table-actions-wrapper', tableContainer).size() === 1) {
                $('.table-group-actions', tableWrapper).html($('.table-actions-wrapper', tableContainer).html()); // place the panel inside the wrapper
                $('.table-actions-wrapper', tableContainer).remove(); // remove the template container
            }
            // handle group checkboxes check/uncheck
            $('.group-checkable', table).change(function() {
                var set = $('tbody > tr > td:nth-child(1) input[type="checkbox"]', table);
                var checked = $(this).is(":checked");
                $(set).each(function() {
                    $(this).attr("checked", checked);
                });
                $.uniform.update(set);
                countSelectedRecords();
            });

            // handle row's checkbox click
            table.on('change', 'tbody > tr > td:nth-child(1) input[type="checkbox"]', function() {
                countSelectedRecords();
            });

            // handle filter submit button click
            table.on('click', '.filter-submit', function(e) {
                e.preventDefault();
                the.submitFilter();
            });

            // handle filter cancel button click
            table.on('click', '.filter-cancel', function(e) {
                e.preventDefault();
                the.resetFilter();
            });
            */
        },

        //提交服务端查询操作
        submitFilter: function(queryForm) {
            /*the.setAjaxParam("action", tableOptions.filterApplyAction);

            // get all typeable inputs
            $('textarea.form-filter, select.form-filter, input.form-filter:not([type="radio"],[type="checkbox"])', table).each(function() {
                the.setAjaxParam($(this).attr("name"), $(this).val());
            });

            // get all checkboxes
            $('input.form-filter[type="checkbox"]:checked', table).each(function() {
                the.addAjaxParam($(this).attr("name"), $(this).val());
            });

            // get all radio buttons
            $('input.form-filter[type="radio"]:checked', table).each(function() {
                the.setAjaxParam($(this).attr("name"), $(this).val());
            });*/
        	the.clearAjaxParams();//清除datatables所有自定义参数
        	the.setFormParams(queryForm);
            dataTable.ajax.reload();
        },

        /*
        resetFilter: function() {
            $('textarea.form-filter, select.form-filter, input.form-filter', table).each(function() {
                $(this).val("");
            });
            $('input.form-filter[type="checkbox"]', table).each(function() {
                $(this).attr("checked", false);
            });
            the.clearAjaxParams();
            the.addAjaxParam("action", tableOptions.filterCancelAction);
            dataTable.ajax.reload();
        },

        getSelectedRowsCount: function() {
            return $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).size();
        },

        getSelectedRows: function() {
            var rows = [];
            $('tbody > tr > td:nth-child(1) input[type="checkbox"]:checked', table).each(function() {
                rows.push($(this).val());
            });

            return rows;
        },
        */

        setAjaxParam: function(name, value) {
            ajaxParams[name] = value;
        },

        addAjaxParam: function(name, value) {
            if (!ajaxParams[name]) {
                ajaxParams[name] = [];
            }

            skip = false;
            for (var i = 0; i < (ajaxParams[name]).length; i++) { // check for duplicates
                if (ajaxParams[name][i] === value) {
                    skip = true;
                }
            }

            if (skip === false) {
                ajaxParams[name].push(value);
            }
        },

        clearAjaxParams: function(name, value) {
            ajaxParams = {};
        },
        
        //设置表单的所有元素为查询条件
        setFormParams: function(queryForm) {
        	//获取表单的所有查询条件
        	var queryArray = queryForm.serializeArray();
        	$.each (queryArray, function(i, field) {
        		ajaxParams[field.name] = field.value;
        	});
        },

        getDataTable: function() {
            return dataTable;
        },

        /*
        getTableWrapper: function() {
            return tableWrapper;
        },

        gettableContainer: function() {
            return tableContainer;
        },
		*/
        
        getTable: function() {
            return table;
        }

    };

};