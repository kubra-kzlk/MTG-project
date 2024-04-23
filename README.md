structuur van het project :


/my-project
  /src
    /controllers    // Functions that handle requests and responses
    /models         // Database models (moet nog komen)
    /routes         // Express routes
    /services       // Business logic
    /views          // EJS templates
    /public         // Static files like CSS, JavaScript, and images
    /utils          // Utility functions and helpers
  /dist             // Compiled JavaScript files from TypeScript
  /node_modules     // Node modules
  .env              // Environment variables
  tsconfig.json     // TypeScript configuration
  package.json      // Project metadata and dependencies


   <section id="legend">
      <h2>Legende</h2>
      <ul>
        <li>Witte rand: Commons</li>
        <li>Blauwe rand: Uncommons</li>
        <li>Gele rand: Rares</li>
        <li>Rode rand: Mythic Rares</li>
      </ul>
    </section>



    <section id="modal" class="modal">
      <article class="modal-content">
        <div class="modal-body">
          <div class="image-modal">
            <img src="./assets/images/Test 11.jpg" alt="Image description" />
          </div>
          <div class="modal-text">
            <p>Kaartnaam</p>
            </br>
            <br>
            <p>Beschrijving kaart</p>
            <div class="modal-bottom">
              <select>
                <option>Stapel kiezen</option>
                <option>Stapel 1</option>
                <option>Stapel 2</option>
                <option>Stapel 3</option>
                <option>Stapel 4</option>
                <option>Stapel 5</option>
                <option>Stapel 6</option>

              </select>

            </div>
          </div>
        </div>
        <span class="close">&times;</span>
      </article>
