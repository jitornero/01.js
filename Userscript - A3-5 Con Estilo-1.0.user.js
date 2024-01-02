// ==UserScript==
// @name         Userscript - A3-5 Con Estilo
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Probando Event Delegation solution
// @author       You
// @match        https://jira.uhub.biz/browse/*
// @run-at
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uhub.biz
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
//trigger() -> tareaChecker -> waitForClick() -> handleAdd/Delet (). Agregar validación
    let trigger = function (e) {
        console.log('%c soy un click en el documento','color: #f709bb');
        let allowedOptions = ['Option1', 'Option2', 'Option3', 'QApruebaenvivo'];
        console.log('currentTarget', e);
        console.log('target: ', e.target);


        function tarea_checker(){
            let textarea = document.getElementById('labels-textarea');
            if (textarea){
                console.log('%c Existe un text area!','color: #f709bb');
                textarea.style.backgroundColor = '#fc8888';
                textarea.style.border = '2px solid #b18282';
                waitForClick(textarea)}
            else {
                console.log('%c no encontramos, lo buscaremos de nuevo en 1 segundo!','color: #f709bb');
                setTimeout(tarea_checker, 1000);}};


        function waitForClick(textarea) {
            console.log('%c ESTAS EN FUNCWAITFORCLICK','color: #f709bb');


            let l = document.querySelector(".field-group.aui-field-labelpicker")
            let posContainer = textarea.getBoundingClientRect().width;
            let container = document.createElement('div');
            container.style.position = 'relative';
            container.style.border = '2px solid #60824a';
            container.style.display = 'flex';
            container.style.flexDirection = 'row';
            container.setAttribute('id','container');
            container.style.backgroundColor = 'rgb(79 234 137)';
            container.style.padding = '10px';
            container.style.width = `${posContainer - 24}px`;
            //container.style.maxWidth = '500px';

            let select = document.createElement('select');
            select.setAttribute('id', 'dropdown');
            select.style.marginBottom = '10px';
            select.style.border = '1px solid yellow';
            select.style.padding = '1%';

            allowedOptions.forEach(function (optionText) {
                let option = document.createElement('option');
                option.text = option.value = optionText;
                select.add(option);
            });

            let buttonDiv = document.createElement('div');
            buttonDiv.setAttribute = ('id','buttonDiv');

            let addButton = document.createElement('button');
            addButton.textContent = 'Add';
            addButton.style.marginLeft = '1em';

            addButton.addEventListener('click', function () {
                event.preventDefault();
                handleAdd(select);
            });

            container.appendChild(select);
            buttonDiv.appendChild(addButton)
            container.appendChild(buttonDiv);
            container.appendChild(document.createElement('br'));

            l.appendChild(container);

            textarea.parentNode.insertBefore(l, textarea.nextSibling);
            l.appendChild(textarea);

            let representationDiv = document.querySelector('.representation');
            representationDiv.style.position = 'absolute';
            representationDiv.style.top = '0';
            representationDiv.style.left = '130px';

        }

        function handleAdd(select) {
            let selectedOption = select.value;

            const liElement = document.createElement('li');
            liElement.className = 'item-row';
            liElement.setAttribute('role', 'option');
            liElement.setAttribute('aria-describedby', 'label-0');
            liElement.id = 'item-row-' + Math.floor(Math.random() * 1000);

            const buttonElement = document.createElement('button');
            buttonElement.type = 'button';
            buttonElement.tabIndex = '-1';
            buttonElement.className = 'value-item';

            const spanElement = document.createElement('span');
            const innerSpanElement = document.createElement('span');
            innerSpanElement.className = 'value-text';
            innerSpanElement.textContent = selectedOption;

            spanElement.appendChild(innerSpanElement);

            buttonElement.appendChild(spanElement);

            const emElement = document.createElement('em');
            emElement.className = 'item-delete';
            emElement.setAttribute('aria-label', ' ');
            emElement.setAttribute('original-title', '');

            liElement.appendChild(buttonElement);
            liElement.appendChild(emElement);

            emElement.addEventListener('click', function () {
                handleDelete(this);
            });

            const ulElement = document.querySelector('.representation .items');
            ulElement.appendChild(liElement);

            let labelsSelect = document.getElementById('labels');

            let newOption = document.createElement('option');
            newOption.value = selectedOption;
            newOption.title = selectedOption;
            newOption.text = selectedOption;
            newOption.selected = 'selected';

            labelsSelect.appendChild(newOption);
        }

        function handleDelete(emElement) {
            let liElement = emElement.parentNode;
            let ulElement = liElement.parentNode;

            ulElement.removeChild(liElement);

            let selectedOption = liElement.querySelector('.value-text').textContent;

            let labelsSelect = document.getElementById('labels');

            Array.from(labelsSelect.options).forEach((option) => {
                if (option.value === selectedOption) {
                    option.remove();
                }
            });
        } ;


        tarea_checker();
    };


    document.body.addEventListener('click', function (e) {
        // Check if the clicked element is #edit-labels or a descendant of it
        if (e.target.closest('#edit-labels')) {
            trigger(e);
        }
        else if (e.target.closest('#create-subtask')) {
            trigger(e);
        }
        else if (e.target.closest('#edit-issue')) {
            trigger(e);
        }
        else if (e.target.closest('#wrap-labels')) {
            trigger(e);
        };

    });


    function val (e) {
        console.log('%c ESTAS EN VAL','color: #f709bb');
        let ulCheck = document.querySelector("div.representation");
        let containsLi = ulCheck.querySelector("li");
        if (containsLi == null){
            console.log('Completa el campo de Labels!');
        };
    };

//VALIDAR CARGA DE DATOS EN CAMPO LABEL
    document.body.addEventListener('click', function (e) {
        // Check if the clicked element is #create-issue-submit or a descendant of it
        if (e.target.closest('#create-issue-submit')) {
            val(e);
        }
        else if (e.target.closest('#submit')) {
            val(e);
        };


    });

})();
