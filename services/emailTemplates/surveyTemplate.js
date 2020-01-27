const keys = require("../../config/keys")

module.exports = survey => {
  return `
        <html>
            <body>
                <div style="text-align: center;background-image: linear-gradient(to bottom right, #3a3535, #232020);">
                  <h1 style="color:#ff7315">Hey do you have a minute? We would like your Input </h1>
                  <br>
                  <div style="color: #f4f4f4">
                    <p>Please answer the following question:</p>
                    <p>${survey.body}</p>
                  </div>
                  <div style="color:green;">
                    <a class="btn btn-primary" href="${keys.redirectDomain}api/surveys/thanks" role="button">Yes</a>
                  </div>
                  <div style="color:red;">
                    <a class="btn btn-primary" href="${keys.redirectDomain}api/surveys/thanks" role="button">No</a>
                  </div>
                </div>
            </body>
        </html>
                
    `;
};
