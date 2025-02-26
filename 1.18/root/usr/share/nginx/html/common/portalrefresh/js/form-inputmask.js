! function(n, a, t) {
    "use strict";
    t(".date-inputmask1").inputmask("10 dec 2109"), t(".phone-inputmask").inputmask({
            mask: "(999) 999-9999",
            autoUnmask: true,
            removeMaskOnSubmit: true

        }), t(".international-inputmask").inputmask("+9(999)999-9999"), t(".xphone-inputmask").inputmask("(999) 999-9999 / x999999"), t(".purchase-inputmask").inputmask("aaaa 9999-****"),
        t(".cc-inputmask").inputmask({
            mask: "9999 9999 9999 9999",
            autoUnmask: true,
            removeMaskOnSubmit: true

        }),
        t(".ssn-inputmask").inputmask("999-99-9999"), t(".isbn-inputmask").inputmask("999-99-999-9999-9"), t(".currency-inputmask").inputmask({
            alias: "currency",
            integerDigits: 12,
            autoUnmask: true

        }), t(".percentage-inputmask").inputmask("99%"), t(".decimal-inputmask").inputmask({ alias: "decimal", radixPoint: "." }), t(".email-inputmask").inputmask({ mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[*{2,6}][*{1,2}].*{1,}[.*{2,6}][.*{1,2}]", greedy: !1, onBeforePaste: function(n, a) { return (n = n.toLowerCase()).replace("mailto:", "") }, definitions: { "*": { validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~/-]", cardinality: 1, casing: "lower" } } }), t(".optional-inputmask").inputmask("(99) 9999[9]-9999"), t(".jit-inputmask").inputmask("mm-dd-yyyy", { jitMasking: !0 }), t(".oncomplete-inputmask").inputmask("d/m/y", { oncomplete: function() { alert("inputmask complete") } }), t(".onincomplete-inputmask").inputmask("d/m/y", { onincomplete: function() { alert("inputmask incomplete") } }), t(".oncleared-inputmask").inputmask("d/m/y", { oncleared: function() { alert("inputmask cleared") } })
}(window, document, jQuery);