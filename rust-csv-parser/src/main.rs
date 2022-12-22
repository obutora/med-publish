use encoding_rs;
use polars::{lazy::dsl::when, prelude::*};
use std::env;
use std::fs::File;
use std::{fs, io};

pub fn convert_to_utf8(file_path: &str, out_path: &str) -> Result<(), io::Error> {
    let s = fs::read(file_path).unwrap();
    let (res, _, _) = encoding_rs::SHIFT_JIS.decode(&s);
    let text = res.into_owned();
    let result = fs::write(out_path, text);
    match result {
        Ok(_) => Ok(()),
        Err(e) => Err(e),
    }
}

fn main() {
    // 引数を取得
    let args: Vec<String> = env::args().collect();
    let input_path = &args[1];

    let output_path = "./data/result.csv";
    let out_json_path = "./data/data.json";

    convert_to_utf8(input_path, output_path).expect("Error : Utf8 convert failed");

    let mut df = LazyCsvReader::new(output_path)
        .has_header(true)
        .finish()
        .unwrap()
        .select([
            col("薬効分類名").alias("category"),
            col("医薬品名").alias("name"),
            col("一般名称").alias("general_name"),
            col("薬価単位").alias("unit"),
            col("先発後発").alias("isGeneric"),
            col("薬価").alias("unit_price"),
            col("在庫数量").alias("amount"),
        ])
        .with_column(
            when(col("isGeneric").str().contains("先発品"))
                .then(false)
                .otherwise(true)
                .alias("isGeneric"),
        )
        .filter(col("amount").gt(0))
        .filter(col("category").is_not_null())
        .collect()
        .unwrap();

    let file = File::create(out_json_path).expect("could not create file");

    JsonWriter::new(file)
        .with_json_format(JsonFormat::Json)
        .finish(&mut df)
        .unwrap();
}
