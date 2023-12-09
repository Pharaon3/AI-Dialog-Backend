module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        domain: String,
        added_date:String,
        page_rank: String,
        google_index: String,
        traffic: String,
        lang: String,
        age: String,
        r_ip: String,
        rd: String,
        tf: String,
        cf: String,
        bl: String,
        spams: String,
        expiration_date: String,
        topicals: String,
        efferings: String,
        historical_keywords: String,
        screenshots: String,
      },
      { timestamps: true }
    );
    const Pbns = mongoose.model("pbns", schema);
    return Pbns;
  };