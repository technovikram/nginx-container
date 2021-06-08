$(window).on('load', function() {
    // $('.loader').hide();
    $('.loader').remove();
    $('.block-overlay').remove();

});
// Textarea limit functility 



$(function() {

    var limit = function(event) {
        var linha = $(this).attr("limit").split(",")[0];
        //   var coluna = $(this).attr("limit").split(",")[1];

        var teaxAreaValueArray = $(this)
            .val()
            .split("\n");

        $.each(teaxAreaValueArray, function(i, value) {
            teaxAreaValueArray[i] = value.slice(0, linha);
        });

        /*  if (teaxAreaValueArray.length >= coluna) {
             teaxAreaValueArray = teaxAreaValueArray.slice(0, coluna);
         } */

        $(this).val(teaxAreaValueArray.join("\n"));
        $(this).attr('data-idValues', teaxAreaValueArray.join("\n"));


    }
    $("textarea[limit]")
        .keydown(limit)
        .keyup(limit);

});
$(function() {

    $('#mainLeftNav > li > span ').attr('aria-expanded', 'true').next().addClass('show');
    $(".left-nav").css("margin-left", "0px");
    $(".main").css("margin-left", "185px");
    $(".main-footer ").css("margin-left", "185px");
    $('#closeNav').show();
    $('.left-nav-icon').removeClass('open').hide();
    $('.left-nav-icon').on('click', function() {
        $(".left-nav").css({ "margin-left": "0px", "width": "200px" });
        $(".main").css("margin-left", "185px");
        $(".main-footer ").css("margin-left", "185px");
        $(".left-nav h5").show();
        $("#expandCollapse").show();
        $('#mainLeftNav').show();
        $(this).addClass('open').hide();
        $('#closeNav').show();
        setTimeout(function() {
            $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
        }, 500)
    });
    $('#closeNav').on('click', function() {
        $(".left-nav").css("width", "35px");
        $("#expandCollapse").hide();
        $('#mainLeftNav').hide();
        $(".left-nav h5").hide();
        $(".main").css("margin-left", "20px");
        $(".main-footer").css("margin-left", "20px");
        $(".left-nav").css("margin-left", "0px");
        $('.left-nav-icon').removeClass('open').show();
        $(this).hide();
        setTimeout(function() {
            $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
        }, 500)
    });
});
/* Coomented for portal refresh
$('.left-nav ul li a').click(function(e) {
    $('a').removeClass('active');
    $(this).addClass('active');
});
*/
// Message  tab grid functionlity start 
$(document).on('init.dt', function(e, settings) {

    var api = new $.fn.dataTable.Api(settings);
    // $(api.table().container()).on('click', 'a,div,td');

    $('.formLastUpdate').datepicker({ format: 'mm/dd/yyyy' });
    $(api.table().container()).on('click', '.date-text', function(e) {
        $(this).children('input.formLastUpdate.date-inputmask').focus();
    });

    $('.formLastUpdate').change(function() {
        if (api.table().search() !== this.value) {
            api.table().search(this.value).draw();
        }
    });

    /*** Table Row expansion ***/

    // $(api.table().container()).on('click', '.dataTable tbody > tr.odd td.expand-column i.material-icons, .dataTable tbody > tr.even td.expand-column i.material-icons', function () {

    $(api.table().container()).on('click', '.dataTable tbody > tr.row-background', function() {
        function format(d) {
            var maxApplication = false,
                maxPlatforms = false,
                maxLogos = false,
                selectedPlatformList = [],
                selectedApplicationList = [],
                selectedLogoList = [],
                selPlatforms = d.data().selectedPlatforms.split(','),
                selApplications = d.data().selectedApplications.split(','),
                selLogos = d.data().selectedLogos.split(','),
                fullPlatformList = $('body').find('.full-platform-list'),
                fullAppsList = $('body').find('.full-apps-list'),
                fullLogosList = $('body').find('.full-logos-list');

            if (selApplications.length > 10) {
                maxApplication = true;

            } else {
                maxApplication = false;
            };
            if (selPlatforms.length > 10) {
                maxPlatforms = true;

            } else {
                maxPlatforms = false;
            };
            if (selLogos.length > 10) {
                maxLogos = true;

            } else {
                maxLogos = false;
            };

            $.each(selPlatforms, function(index, value) {
                if (selectedPlatformList.length < 10) {
                    selectedPlatformList.push(value);
                }
            });
            $.each(selApplications, function(item, value) {
                if (selectedApplicationList.length < 10) {
                    selectedApplicationList.push(value);
                }
            });
            $.each(selLogos, function(item, value) {
                if (selectedLogoList.length < 10) {
                    selectedLogoList.push(value);
                }
            });

            fullAppsList.empty();
            for (var i = 0, len = selApplications.length; i < len; i++) {
                var current = selApplications[i];
                fullAppsList.append('<option value="' + current + '">' + current + '</option>');
            }

            fullLogosList.empty();
            for (var i = 0, len = selLogos.length; i < len; i++) {
                var current = selLogos[i];
                fullLogosList.append('<option value="' + current + '">' + current + '</option>');
            }

            // `d` is the original data object for the row
            return '<div class="row marginright-10">' +
                '<div class="col-sm-4 row left10-padding marginright-10">' +
                '<div class="col-md-5"><b> Display Date:</b></div><div class="col-md-7">' + d.data().displayStartDate + '</div>' +
                '</div>' +
                '<div class="col-sm-4 row left10-padding marginright-10">' +
                '<div class="col-md-5"><b> Created By:</b></div><div class="col-md-7">' + d.data().createdBy + '</div>' +
                '</div>' +
                '<div class="col-sm-4 row left10-padding marginright-10">' +
                '<div class="col-md-5"><b> Last Modified By:</b></div><div class="col-md-7">' + d.data().lastUpdatedBy + '</div>' +
                '</div>' +
                '</div><div class="row pt-3">' +
                '<div class="col-sm-4 row left10-padding marginright-10"> ' +
                '<div class="col-md-5"><b>End Date:</b></div><div class="col-md-7">' + d.data().displayEndDate + '</div>' +
                '</div>' +
                '<div class="col-sm-4 row left10-padding marginright-10"> ' +
                '<div class="col-md-5"><b>Create Date:</b></div><div class="col-md-7">' + d.data().createdDate + '</div>' +
                '</div>' +
                '<div class="col-sm-4 row left10-padding marginright-10"> ' +
                '<div class="col-md-5"><b>Last Modified Date:</b></div><div class="col-md-7">' + d.data().lastUpdatedDate + '</div>' +
                '</div>' +
                '</div>' +
                '<hr class="horizontal-row ">' +
                '<div class="row pt-3">' +
                '<div class="col-md-12">' + d.data().content + '</div>' +
                '</div>' +
                '<hr class="horizontal-row">' +
                '<div class="row pt-3 marginright-10">' +
                '<div class="col-md-1"><b>Platforms:</b></div><div class="col-md-10">' + selectedPlatformList + (maxPlatforms ? '... <a href="#" data-toggle="modal" data-target="#appsListModal" data-applications="' + d.data().selectedPlatforms + '">View Full List</a>' : '') +
                '</div></div>' +
                '<div class="row pt-3 marginright-10">' +
                '<div class="col-md-1"><b>Applications:</b></div><div class="col-md-10">' + selectedApplicationList + (maxApplication ? '... <a href="#" data-toggle="modal" data-target="#appsListModal" data-applications="' + d.data().selectedApplications + '">View Full List</a>' : '') +
                '</div></div>' +
                '<div class="row pt-3 marginright-10">' +
                '<div class="col-md-1"><b>Logos:</b></div><div class="col-md-10">' + selectedLogoList + (maxLogos ? '... <a href="#"  data-toggle="modal" data-target="#logosListModal" data-logolist="' + d.data().selectedLogos + '">View Full List</a>' : '') +
                '</div><div class="col-md-1"></div>' +
                '</div>';

        }

        var tr = $(this).closest('tr');
        var row = api.table().row(tr);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.children('td:first').html('<i class="material-icons">&#xE037;</i>');
            tr.removeClass('shown');
        } else {
            // Open this row
            tr.children('td:first').html('<i class="material-icons">&#xE1C8;</i>');
            row.child(format(row)).show();
            tr.addClass('shown');
        }

        $('.full-list-search').on('keyup', function() {
            var selLogos = row.data().selectedLogos.split(',');
            var listItems = [];
            var fullLogosList = $('body').find('.full-logos-list');
            var search = $(this).val(),
                isMinSearchVal = search.length >= 3;
            $(this).next('i.full-list-close')[search ? 'addClass' : 'removeClass']("display-block")[search ? 'removeClass' : 'addClass']("display-none");
            if (isMinSearchVal) {
                listItems = selLogos.filter(function(item) {
                    return item.toLowerCase().match(search.toLowerCase());
                });
            } else {
                listItems = selLogos;
            }

            fullLogosList.empty();
            for (var i = 0, len = listItems.length; i < len; i++) {
                var current = listItems[i];
                fullLogosList.append('<option value="' + current + '">' + current + '</option>');
            }
        });

        $('.full-list-close').on('click', function() {
            debugger;
            var selLogos = row.data().selectedLogos.split(',');
            var fullLogosList = $('body').find('.full-logos-list');
            var searchInput = $(this).prev('input');
            searchInput.val('');
            var search = searchInput.val();
            $(this)[search ? 'addClass' : 'removeClass']("display-block")[search ? 'removeClass' : 'addClass']("display-none");

            fullLogosList.empty();
            for (var i = 0, len = selLogos.length; i < len; i++) {
                var current = selLogos[i];
                fullLogosList.append('<option value="' + current + '">' + current + '</option>');
            }
        });

    });

    $(api.table().container()).on('click', '#searhUserAdminData.dataTable tbody > tr', function() {

        var tr = $(this).closest('tr');
        tr.siblings('tr').removeClass('activeRow');
        var row = api.table().row(tr);
        tr.addClass('activeRow');
        $('.user-form-buttons').children('button').removeProp('disabled');

    });
});

/* ***** DataTable ****/

var messageGridScrollyHeight

$(document).ready(function() {


    $('.loader').remove();
    $('.block-overlay').remove();

    $(this).on('click', 'i.refresh', function() {
        loadData($('.mainTab .activeTab'))
    });
    /* ***** Msg Tab script start */
    messageGridScrollyHeight = $('.tab-content.calc-hgt').height() - 130;
    var target = $('.mainTab li:first-child a');
    if ($(target).attr("data-loaded") === 'false') {
        loadData(target);
    }

    $(".app-tabs a").on('show.bs.tab', function(e) {
        if ($(e.target).attr("data-loaded") === 'false') {
            loadData(e.target);
        }
    });

    // Main tab
    $('.mainTab.app-tabs.nav-tabs li a').on('click', function(e) {
        $('.mainTab.app-tabs.nav-tabs li').find('a.activeTab').removeClass('activeTab');
        $(this).addClass('activeTab');
    });

    // Add all option to select
    $('.dataTables_scrollFootInner th select option:first-child').text('All');

    // Form tab grid functionlity 
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        $($.fn.dataTable.tables(true)).DataTable()
            .columns.adjust();
    });
    /*  $(".formLastUpdate").datepicker({
         format: 'M dd yyyy',
         onSelect: function(e) {
             alert(e);

             //   messageGridTable.draw();
         },
         changeMonth: true,
         changeYear: true
     }); */

    setTimeout(function() {

        $(".formDate").datepicker({
            format: 'mm/dd/yyyy',

            changeMonth: true,
            changeYear: true
        }).on('show', function(e) {
            if (e.target.id) {
                $('.datepicker-dropdown:visible').addClass(e.target.id + '-datepicker');
            }
        }).on('changeDate', function() {
            $(this).datepicker('hide');
        });

    }, 1000)

    /*    $('.formLastUpdate').change(function() {
           if (formsGridTable.search() !== this.value) {
               formsGridTable.search(this.value).draw();
           }
       });
    /*** Exapnd/ Collapse icon change ***/
/* For Portal Refresh
    $('.left-nav > ul > li > a').on('click', function(e) {
        var expandedVal = $(this).attr('aria-expanded');
        if (expandedVal === 'false') {
            $(this).children('i').html('&#xE1C8;');
        } else {
            $(this).children('i').html('&#xE037;');
        }
    });
*/
    //-------------quick acess slide toggle and modal draggable starts-------

    // $('.modal-dialog').draggable({
    //     handle: ".modal-header",
    //     scroll: false
    // })
    $('#quickAccessToggle').click(function() {
        $('.quick-access-box').slideToggle();
    });

    /*------ Quick Access toggle icon change starts ---*/
    $('#quickAccessToggle').on('click', function(e) {
        var expandedVal = $(this).attr('aria-expanded');
        if (expandedVal === 'false') {
            $(this).children('i.caret-custom').html('&#xE5C7;');
        } else {
            $(this).children('i.caret-custom').html('&#xE5C5;');
        }
    });

    /*------ Quick Access box hide on outside click ---*/
    $(document).click(function(e) {
        // e.preventDefault();
        var container = $(".quick-access-box"); // YOUR CONTAINER SELECTOR
        if (!container.is(e.target) && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.hide();
            $('#quickAccessToggle').children('i.caret-custom').html('&#xE5C5;');
        }
    });

    $('form').on('click', '.date-text', function(e) {

        $(this).children('input.date-input.formDate').focus();
        $(this).children('#contentEndDate').focus();
    });
	//added for portal refresh
	$('#expandAll').on('click', function(e) {
     $('#mainLeftNav > li > span > a ').children().html('&#xE1C8;');
    $('#mainLeftNav > li > span ').attr('aria-expanded', 'true').next().addClass('show');
	});
	
	$('#collapseAll').on('click', function(e) {
    $('#mainLeftNav > li > span > a ').children().html('&#xE037;');
    $('#mainLeftNav > li > span ').attr('aria-expanded', 'false').next().removeClass('show');
});
$('.left-nav > ul > li > span > a').click(function (e) {
        var expandedVal = $(this).parent().attr('aria-expanded');
        if (expandedVal === 'false') {
            $(this).children('i').html('&#xE1C8;');
        } else {
            $(this).children('i').html('&#xE037;');
        }
    });
	$('.left-nav ul li span').click(function (e) {
    $('span').removeClass('active');
    $(this).addClass('active');
});
});

/* ------Expand all starts here-----*/
/* commented for portal refresh
$('#expandAll').on('click', function(e) {
    $('#mainLeftNav > li > a ').children().html('&#xE1C8;');
    $('#mainLeftNav > li > a ').attr('aria-expanded', 'true').next().addClass('show');
});
*/
/* ------Collapse all starts here-----*/
/* commented for portal refresh
$('#collapseAll').on('click', function(e) {
    $('#mainLeftNav > li > a ').children().html('&#xE037;');
    $('#mainLeftNav > li > a ').attr('aria-expanded', 'false').next().removeClass('show');
});
*/

// $(document).ready(function() {


// });


/*** DataTable Draw starts here  *****/
function loadData(element) {
    checkTimeoutActivity();
    if (timeoutFlag) {
        return;
    }
    str1 = '<div class="block-overlay"></div>';
    str2 = '<div class="loader custom-loader"></div>';
    $(str1).appendTo('.tab-content.calc-hgt').css({ "display": "block" });
    $(str2).appendTo('.tab-content.calc-hgt');
    $(element).attr("data-loaded", 'true');
    var target = $(element).attr("data-target")
    var targetTable = $(element).attr("data-target") + 'Data';
    var ID = $(element).attr("data-url");
    var tabTitle = $(element).attr("title");
    jqxhr = $.ajax(ID)
        .done(function(data) {
            //            data = JSON.parse(data);
            var rowType = data.rows;
            if ($(targetTable + '> thead>tr').children().length === 0) {
                $.each(data.columns, function(k, colObj) {
                    str = '<th class="sorting-col" title="' + colObj.name + '">' + colObj.name + '</th>';
                    $(str).appendTo(targetTable + '> thead>tr');
                    if (colObj['default-val']) {
                        ftr = '<th title=" Filter by ' + colObj.name + '" data-type="' + colObj.type + '" data-placeholder = "' + colObj['default-val'] + '"></th>';
                    } else {
                        ftr = '<th title=" Filter by ' + colObj.name + '" data-type="' + colObj.type + '"></th>';
                    }
                    $(ftr).appendTo(targetTable + ' >tfoot>tr');
                });
            }

            $(targetTable).dataTable({
                "data": data.data,
                "columns": data.columns,
                "pageLength": 25,
                "order": data.order,
                createdRow: function(row, data, rows, index) {
                    if (rowType === "pointer") {
                        $(row).addClass('row-background');
                    }
                },
                "dom": '<"top">rt<"bottom"pli><"clear">',
                "processing": true,
                "pagingType": 'full_numbers',
                "destroy": true,
                initComplete: function() {
                    var $table = $(this);
                    $table.closest('.dataTables_wrapper').find('> div > .dataTables_length label').contents().filter(function() {
                        return ($(this).prop('tagName') !== 'SELECT');
                    }).wrap('<span class="length-text"></span>');
                    $('.dataTables_length label').find('span.length-text:first-child').text("")
                    $('.dataTables_length label').find('span.length-text:last-child').text("Items per page");
                    var objDataTable = this;
                    if (objDataTable) {
                        filterOptions(objDataTable);
                    }
                    $(targetTable + '_wrapper .bottom .dataTables_info').before('<i class="material-icons refresh">&#xE5D5</i>');
                },
                drawCallback: function() {
                    setTimeout(function() {
                        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                    }, 100)
                },
                orderCellsTop: true,
                "scrollY": messageGridScrollyHeight + 'px',
                "scrollCollapse": true,

            });
            $('.loader').remove();
            $('.block-overlay').remove();

        }).fail(function(jqXHR, textStatus, errorThrown) {
            $(element).attr("data-loaded", 'false');
            $('.loader').remove();
            $('.block-overlay').remove();
        });
}

/*** DataTable Filter starts here *****/
function filterOptions(obj) {
    obj.api().columns().every(function(e) {
        var column = this;
        var headerCont = this.header();
        var footercol = this.footer();
        var text = $(headerCont).text().replace(/\s+/g, '');
        if ($(footercol).attr('data-type') === "List") {
            var select = $('<select><option value="">All</option></select>')
                .appendTo($(column.footer()).empty())
                .on('change', function() {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );
                    column.search(val ? '^' + val + '$' : '', true, false).draw();
                });
        } else if ($(footercol).attr('data-type') === "Date") {
            var dateInput = $('<span class="date-text"><input name="formLastUpdate" type="text"  autocomplete="off" class="formLastUpdate date-input  date-inputmask"></span>').appendTo($(column.footer()).empty());

        } else if ($(footercol).attr('data-type') === "Text") {
            var placeholderText = $(footercol).attr('data-placeholder');
            var input = $('<span class="search-text"><input class="table-header-input" placeholder="' + placeholderText + '"></span>')
                .appendTo($(column.footer()).empty())
                .on('input', function() {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).children('input').val()
                    );
                    if ($(this).children('input').val() != '') {
                        if ($(this).children().length <= 1) {
                            var button = $('<i class="material-icons clear-search">close</i>').appendTo(this).on('click', function() {
                                $(this).parent().children('input').val('');
                                val = $(this).parent().children('input').val();
                                $(button).remove();
                                column
                                    .search(val).draw();
                            });
                        }
                    } else {
                        $(this).children("i").remove();
                    }
                    column
                        .search(val, true, false).draw();
                });
        }
        if (select) {
            column.data().unique().sort().each(function(d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });
            if (input) {
                $('input').on('keyup change', function() {
                    if (that.search() !== this.value) {
                        that
                            .search(this.value)
                            .draw();
                    }
                });
            }
        }
    });
}

// -------------quick acess slide toggle and modal draggable ends-------

// grid body height resize
$(window).on('resize', function() {

    messageGridScrollyHeight = $('.tab-content.calc-hgt').height() - 130;

    $('.dataTables_scrollBody').css("max-height", messageGridScrollyHeight);
    var mainLeftNavHeight = $('body').height();
    $('.main-left-nav').css('height', mainLeftNavHeight - 140)

});

//draggable quick-modal starts
$('.action-button-col button, #quickModal').click(function() {
    $(this.dataset["target"]).modal({
        show: true
    });
});

//draggable modal ends

//Picklist for Quick Modal Starts
var favSaved = false;
var favChanged = false;

function handleAllApplicationsChange(e) {
    if (($("#allApplications option:selected").length + $("#favApplications option").length) > 10) {
        $('.quick-modal-message').addClass('error-block');
        $('#moveAllAppsToFav').prop('disabled', true);
        $('#moveAppsToFav').prop('disabled', true);
    } else {
        $('.quick-modal-message').removeClass('error-block');
        setMoveAppButtons();
    }
}

function handleFavApplicationsChange(e) {
    $('.quick-modal-message').removeClass('error-block');
    setMoveAppButtons();
}

function enableApplicationsListsChange() {
    $('#allApplications').on('change', handleAllApplicationsChange);
    $('#favApplications').on('change', handleFavApplicationsChange);
}

function disableApplicationsListsChange() {
    $('#allApplications').off('change');
    $('#favApplications').off('change');
}

enableApplicationsListsChange();

function setMoveAppButtons() {
    if ($("#allApplications option").length <= 0 || $("#favApplications option").length >= 10) {
        $('#moveAllAppsToFav').prop('disabled', true);
        $('#moveAppsToFav').prop('disabled', true);
    } else {
        $('#moveAppsToFav').prop('disabled', false);
        if (($("#allApplications option").length + $("#favApplications option").length) <= 10) {
            $('#moveAllAppsToFav').prop('disabled', false);
        } else {
            $('#moveAllAppsToFav').prop('disabled', true);
        }
    }
}

function setMoveButtons() {
    if ($("#favApplications option").length <= 0) {
        $('#moveAllFavToApps').prop('disabled', true);
        $('#moveFavToApps').prop('disabled', true);
    } else {
        $('#moveAllFavToApps').prop('disabled', false);
        $('#moveFavToApps').prop('disabled', false);
    }
    setMoveAppButtons();
}

$(document).ready(function() {
    setMoveButtons();
    //     refreshFavorites();
    //     refreshApp();
});


//Move from Applications to Favorites
$("#moveAppsToFav").click(function() {
    disableApplicationsListsChange();
    moveSelApps(document.getElementById('allApplications'), document.getElementById('favApplications'));
    favChanged = true;
    enableApplicationsListsChange();
    setMoveButtons();
});

//Move from Favorites to Applications
$("#moveFavToApps").click(function() {
    disableApplicationsListsChange();
    moveSelApps(document.getElementById('favApplications'), document.getElementById('allApplications'));
    favChanged = true;
    enableApplicationsListsChange();
    setMoveButtons();
});
//Move all from Applications to Favorites

$("#moveAllAppsToFav").click(function() {
    disableApplicationsListsChange();
    moveAllApps(document.getElementById('allApplications'), document.getElementById('favApplications'));
    favChanged = true;
    enableApplicationsListsChange();
    setMoveButtons();
});

//Move all from Favorites to Applications
$("#moveAllFavToApps").click(function() {
    disableApplicationsListsChange();
    moveAllApps(document.getElementById('favApplications'), document.getElementById('allApplications'));
    favChanged = true;
    enableApplicationsListsChange();
    setMoveButtons();
});

$("#saveFavorites").click(function() {
    checkTimeoutActivity();
    if (!timeoutFlag) {
        updateFavorites();
    }
    favSaved = true;
    $('#quickAccessModal').modal('hide');
});

$('#quickAccessModal').on('hidden.bs.modal', function(e) {
    if (favSaved) {
        favSaved = false;
    } else {
        if (favChanged) {
            resetFavorites();
        }
    }
    favChanged = false;
});

$("#quickModal").click(function() {
    checkTimeoutActivity();
    if (!timeoutFlag) {
        $('#quickAccessModal').modal('show');
    }
});

//Picklist for Quick Modal ends

//logoff-button-masterpage
$("#logOffButton").on("click", function() {
    window.location.href = '../HTML/log_off_confirmation.html';
});

// Allowed pattern for input field starts

$('.numeric-field').keypress(function(e) {
    isNumber(e);

});
$('.alphaNumeric-field').keypress(function(e) {
    alphaNumericPattern(e);

});
$('.alphaNumericWithSpace-field').keypress(function(e) {
    alphaNumericWithSpacePattern(e);

});
$('.date-field').keypress(function(e) {
    datePattern(e);

});
$('.name-field').keypress(function(e) {
    NamePattern(e);

});
$('.address-field').keypress(function(e) {
    addressPattern(e);

});
$('.alpha-field').keypress(function(e) {
    alphaPattern(e);

});
$('.email-field').keypress(function(e) {
    emailPattern(e);

});

function alphaPattern(e) {
    var regex = new RegExp("^[a-zA-Z]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
}

function alphaNumericPattern(e) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
}

function alphaNumericWithSpacePattern(e) {
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
}

function isNumber(e) {
    var regex = new RegExp("[0-9]");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
}

function datePattern(e) {
    var regex = new RegExp("^[0-9/]*$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
}

function NamePattern(e) {
    // var regex = new RegExp("^[a-zA-Z0-9/!@#$_-+=|:;.,]+$");
    var regex = new RegExp("^[A-Za-z0-9_ @.!$\|;:,.\"/#=+-]*$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
}

function addressPattern(e) {
    var regex = new RegExp("^[a-zA-Z0-9 ,./-]*$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
}

function emailPattern(e) {
    var regex = new RegExp("^[A-Za-z0-9_@.!$%&*\|;:',.\"{/}^`~?#=+-]*$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
}


// popover Functionality starts

$('body').on('click', function(e) {
    $("[data-toggle=popover]").popover({
        html: true,
        // trigger: 'hover click',
        // container: '.popover-body',
        content: function() {
            var content = $(this).attr("data-popover-content");
            return $(content).children(".popover-body").html();
        },
        placement: function(popover, element) {
            $(popover).addClass($(element).data('container-class'));
            return $(element).data('placement');
        }
    })

    $('[data-toggle="popover"]').each(function() {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});

// popover Functionality ends



function printContent(id) {
    var divContents = document.getElementById(id);
    var headTitle = $('#' + id).parent().children('.modal-header').find('.modal-title span').html();
    var printWindow = window.open('', '');
    printWindow.document.write('<html><head><link href="../css/print.css" rel="stylesheet"><style>.modal-body-scroll{max-height:2000px !important;} .left3-right5-padding{padding-left:15px!important;}</style></head>');
    printWindow.document.write('<body style="padding:0px 30px; margin:0px 20px"> <h1>' + headTitle + '</h1> <br>');
    printWindow.document.write('<div class="block-overlay custom-overlay"></div><div class="loader custom-loader"></div>');
    printWindow.document.write('</body></html>');

    printWindow.document.close();

    printWindow.mainDiv = printWindow.document.createElement('div');
    printWindow.document.body.appendChild(printWindow.mainDiv);
    printWindow.mainDiv.innerHTML = divContents.outerHTML;
    var xnodes = printWindow.mainDiv.getElementsByTagName('input');
    for (var j = 0; j < xnodes.length; j++) {
        var n = document.getElementById(xnodes[j].id);
        xnodes[j].value = n.value;
        if (n.type === 'radio' || n.type === 'checkbox') {
            xnodes[j].checked = n.checked;
        }
    }

    xnodes = printWindow.mainDiv.getElementsByTagName('select');
    for (var j = 0; j < xnodes.length; j++) {
        var n = document.getElementById(xnodes[j].id);
        xnodes[j].value = n.value;
        xnodes[j].options[n.selectedIndex].selected = true;
    }

    xnodes = printWindow.mainDiv.getElementsByTagName('textarea');
    for (var j = 0; j < xnodes.length; j++) {
        var n = document.getElementById(xnodes[j].id);
        xnodes[j].value = n.value;
    }
    var blockOverlay = printWindow.document.getElementsByClassName('block-overlay')[0];
    var loader = printWindow.document.getElementsByClassName('loader')[0];
    printWindow.document.body.removeChild(blockOverlay);
    printWindow.document.body.removeChild(loader);
    setTimeout(function() {
        printWindow.print();
        printWindow.close();
    }, 0)

}