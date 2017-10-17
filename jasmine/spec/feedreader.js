 //Placing all test within the $() function to ensure they run after the DOM is ready.
$(function() {

    describe('RSS Feeds', function() {
    
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test that loop through each feed and ensure it has a url which is not empty.
        it('has a non-empty URL', function() {
            //using forEach to loop through all the feeds in allFeeds since it's an array.
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
            
        });


        // Test that loop through each feed and ensure it has a name and it is not empty.
        it('has a non-empty name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
            
        }); 

    });


    describe('The menu', function() {

        //Test if the menu is hidden on load.
        it('is hidden by default', function() {
            expect(document.body.classList).toContain('menu-hidden');
        });

        //Test if the visibility of the menu can be toggled by clicking the menu icon.
        it('changes visibility when the menu icon is clicked', function() {
            $(".menu-icon-link").click();
            expect(document.body.classList).not.toContain('menu-hidden');

            $(".menu-icon-link").click();
            expect(document.body.classList).toContain('menu-hidden');
        });

    });

        
    describe('Initial Entries', function() {
        //Using beforeEach and done becuase loadFeed is asynchronous.
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        //Test if loadFeed() adds content to the container.
        it('are not empty', function() {
            expect($('.feed .entry').length).not.toBe(0);//Testing if there's any child elements in the container.
        });

    });

    describe('New Feed Selection', function() {
        let feed1;
        beforeEach(function(done) {
            loadFeed(1, function() {
            feed1 = $('.entry').html();
            done();
            });
            
        });

        //Test if the content changes when loadFeed() loads new feed.
        it('content changes', function(done) {
            loadFeed(2, function() {
                let feed2 = $('.entry').html();
                expect(feed2).not.toBe(feed1);
                done();
            });

        });


    });

}());
