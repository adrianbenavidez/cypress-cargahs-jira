///<reference types="Cypress" />

require('@cypress/xpath')
require('cypress-plugin-tab')

describe("Carga hs Jira",() =>{

    let fechaActual = ""

    before(()=>{
        
        cy.fixture('cargahs').then(function(data){
            globalThis.data=data
        })
        
        cy.viewport(1200, 900)
      
        cy.visit("https://signe.gruposancorseguros.com/secure/Tempo.jspa#/my-work/week?type=LIST")
        cy.xpath("//input[@id='login-form-username']").should("be.visible").type("hbenavidez")
        cy.xpath("//input[@id='login-form-password']").should("be.visible").type("Jupiter023")
        cy.xpath("//input[@id='login-form-submit']").should("be.visible").click()

         // crea un nuevo objeto `Date`
         var today = new Date();
 
         // `getDate()` devuelve el día del mes (del 1 al 31)
         var day = today.getDate();
 
         if(day<10){day="0"+day}
  
         // `getMonth()` devuelve el mes (de 0 a 11)
         var month = today.getMonth() + 1;
 
         if(month<10){month="0"+month}
         
         // `getFullYear()` devuelve el año completo
         var year = today.getFullYear();
         
         fechaActual = year+"-"+month+"-"+day
         // muestra la fecha de hoy en formato `MM/DD/YYYY`
         //cy.log("******"+fechaActual2);
    })


    it.only("Carga personalizada de hs de trabajo",()=>{

        data.forEach(element => {
       
        //Posicionamos el mouse sobre la columna del calendario
        cy.xpath("//*[@id='" + fechaActual + "']/div").trigger('mouseover',{ force:true }) 
        
        //Hacemos click forzado sobre un elemento con display:none
        cy.xpath("//*[@id='" + fechaActual + "']/div/div/div/div[1]").click({ force:true })
        

        cy.get("[placeholder='Buscar incidencias…']").should("be.visible").type(element.crio)
        cy.xpath("//*[@id='"+element.crio+"-search-0-row']/div/img").click()

        cy.xpath("//textarea[contains(@width,'100%')]").should("be.visible").type(element.descripcion)

        cy.get('#periodCheckbox').check()
        
        cy.xpath("//input[contains(@id,'started')]").should('be.visible').clear()
        cy.xpath("//input[contains(@id,'started')]").type(element.fechaInicio)
        cy.get("#comment").click()
        
        cy.xpath("//input[contains(@id,'endDate')]").should('be.visible').clear()
        cy.xpath("//input[contains(@id,'endDate')]").type(element.fechaFinalizacion)
        cy.get("#comment").click()

        cy.wait(1500)
        cy.get("#timeSpentSeconds").type(element.hs)
        //cy.get("#remainingEstimate").type(element.hs)

        //cy.get("#_Homeoffice_").check()

        cy.get("[name='submitWorklogButton']").click()
        cy.wait(1800)

        });
       
    })




    it("Carga unica",()=>{

        //Posicionamos el mouse sobre la columna del calendario
        cy.xpath("//*[@id='2023-03-13']/div/div/div/div[1]").trigger('mouseover',{ force:true }) 
       
        //Hacemos click forzado sobre un elemento con display:none
        cy.xpath("//*[@id='2023-03-13']/div/div/div/div[1]").click({ force:true })
        

        cy.get("[placeholder='Buscar incidencias…']").should("be.visible").type("30219")
        cy.xpath("//*[@id='CRIO-30219-search-0-row']/div/div/div[1]").click()
        

        cy.xpath("//textarea[contains(@width,'100%')]").should("be.visible").type("ejemplo")

        cy.get('#periodCheckbox').check()
        
        cy.xpath("//input[contains(@id,'started')]").clear()
        cy.xpath("//input[contains(@id,'started')]").type("13/Mar./2023")
        cy.xpath("//*[@id='worklogForm']/div[5]/div/div/div[1]/label").click()
        
        cy.xpath("//input[contains(@id,'endDate')]").clear()
        cy.xpath("//input[contains(@id,'endDate')]").type("14/Mar./2023")
        cy.xpath("//*[@id='worklogForm']/div[6]/div[1]/label").click()

        cy.get("#timeSpentSeconds").type("2h")
        //cy.get("#remainingEstimate").type(element.hs)

        //cy.get("#_Homeoffice_").check()

        cy.get("[name='submitWorklogButton']").click({force:true})
        cy.wait(2000)

       
    })



    after(()=>{

        cy.log("Finaliza el programa...")

    })

})//Cierre de describe