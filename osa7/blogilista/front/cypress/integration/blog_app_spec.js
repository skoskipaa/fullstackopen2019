describe('Blog ', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('BlogFinder')    
    })

    it('login is found', function() {
        cy.contains('login')
            .click()
    })
})

describe('User ', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Aku Ankka',
            username: 'aku',
            password: 'hanhi'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
        })

        
        it('can log in with correct username and password', function() {
            cy.get('#username')
                .type('aku')
            cy.get('#password')
                .type('hanhi')
            cy.contains('login')
                .click()
            cy.contains('is logged in')
        })

        it('can not log in with wrong password', function() {
            cy.get('#username')
                .type('aku')
            cy.get('#password')
                .type('ankka')
            cy.contains('login')
                .click()
            cy.contains('Wrong username or password')
        })
        
        describe('when logged in', function() {
            beforeEach(function() {
            cy.get('#username')
                .type('aku')
            cy.get('#password')
                .type('hanhi')
            cy.contains('login')
                .click()
            })

            it('the name of the user is shown', function() {
                cy.contains('Aku Ankka')
            })

            it('can add a new blog', function() {
                cy.contains('Blogs')
                    .click()
                cy.contains('Add a blog')
                    .click()
                cy.get('#title')
                    .type('You Look Fab!')
                cy.get('#author')
                    .type('The Fab Team')
                cy.get('#url')
                    .type('youlookfab.com')
                cy.get('#submit')
                    .click()
                cy.contains('Blogs')
                    .click()
                cy.contains('You Look Fab!')
            })

            it('can like a blog', function() {
                cy.contains('Blogs')
                    .click()
                cy.contains('Add a blog')
                    .click()
                cy.get('#title')
                    .type('You Look Fab!')
                cy.get('#author')
                    .type('The Fab Team')
                cy.get('#url')
                    .type('youlookfab.com')
                cy.get('#submit')
                    .click()
                cy.contains('Blogs')
                    .click()
                cy.contains('You Look Fab!')
                    .click()
                cy.get('#like')
                    .click()
                cy.contains('1 likes')
            })

            it('can add a comment', function() {
                cy.contains('Blogs')
                    .click()
                cy.contains('Add a blog')
                    .click()
                cy.get('#title')
                    .type('You Look Fab!')
                cy.get('#author')
                    .type('The Fab Team')
                cy.get('#url')
                    .type('youlookfab.com')
                cy.get('#submit')
                    .click()
                cy.contains('Blogs')
                    .click()
                cy.contains('You Look Fab!')
                    .click()
                cy.get('#comment')
                    .type('Yes, you most certainly do!')
                cy.contains('Add comment')
                    .click()
                cy.contains('Yes, you most certainly do!')
                
            })

            it('can log out', function() {
                cy.contains('logout')
                    .click()
                cy.contains('login')
            })
            
        })

})