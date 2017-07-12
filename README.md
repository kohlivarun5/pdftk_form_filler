# pdftk_form_filler
Use PDFTK to fill forms


## Un-password a file
- You can use [SmallPdf](https://smallpdf.com/unlock-pdf) to unlock the pdf as a one time thing

## Get PDFTK
- You can get PDFTK from their website, or if you have MAC issues, check [this](http://stackoverflow.com/questions/32505951/pdftk-server-on-os-x-10-11)

## Get fdf of PDF
- To correctly get form data, run:

`pdftk input.pdf generate_fdf output file.fdf`
- [This](http://stackoverflow.com/questions/36613976/pdftk-throws-a-java-exception-when-attempting-to-use-fill-form-function) stackoverflow post might be helpful

## Fill and generate PDF
- You can then modify the `fdf` file with the data and run:

`pdftk input.pdf fill_form file.fdf output filled.pdf flatten`
- `flatten` will make sure the output text is also `pretty`

## Work with AWS Lambda (https://lob.com/blog/aws-lambda-pdftk)
- `./dist.sh` : Create zip file
- Go to AWS console and upload and test
- You do not need credentials in LAMBDA as AWS IAM role will set them

