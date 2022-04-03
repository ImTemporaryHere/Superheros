let's suppose that you have mongo db locally installed.

##to start the app run next commands: 
1. npm run client:install
2. npm run client:build
3. npm run start

###api endpoints :


##get /api/superheroes/:superHeroId

endpoint for getting single superHero by its id;
superhero contains :

    {

        _id: String,

        nickname: String,
        
        real_name: String,
        
        origin_description: String,
        
        superpowers: String,
        
        catch_phrase: String,
        
        profileImagePath: String,
        
        images: [

            {
                _id: String,
                path: String,
                superHeroId: Types.ObjectId
            }
            
        ]

    } 








##get /api/superheroes/?page&limit

where: page = number,limit = number, 

response - 
1. docs {Array} - Array of documents of the superheroes,
2. totalDocs {Number} - Total number of documents in collection that match a query
3. limit {Number} - Limit that was used
4. hasPrevPage {Bool} - Availability of prev page.
5. hasNextPage {Bool} - Availability of next page.
6. page {Number} - Current page number
7. totalPages {Number} - Total number of pages.
8. offset {Number} - Only if specified or default page/offset values were used
9. prevPage {Number} - Previous page number if available or NULL
10. nextPage {Number} - Next page number if available or NULL
11. pagingCounter {Number} - The starting index/serial/chronological number of first document in current page. (Eg: if page=2 and limit=10, then pagingCounter will be 11)


##post /api/superheroes/

end point for creating a superHero, expects you to provide multipart/form data

with fields : 

        nickname: String,

        real_name: String,
        
        origin_description: String,
        
        superpowers: String,
        
        catch_phrase: String,

        profileImage: image file, max number 1,

        images: list of image files for gallery, max number 10,


##delete /api/superheroes/:superHeroId

endpoint for removing superHero and all its images

superHeroId - id of the superHero to be removed


##post /api/superheroes/:superHeroId/images

endpoint for adding new images to the existing superHero

superHeroId - id of the superHero image will be added to.

expects you to provide multipart/form data with fields: 

        images: list of image files for gallery, max number 10,

##delete /api/superheroes/:superHeroId/images/:imageId

endpoint for removing images from the existing superHero

:superHeroId - id of the superHero images will be removed from.

:imageId - id of the image to removed.