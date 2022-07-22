const { Op } = require("sequelize");
const { Category, Product, State } = require("../db");

const paginate = async (
  model,
  pageActual,
  pageLimit,
  search = {},
  order = [],
  filter
) => {
  try {
    const limit = parseInt(pageLimit, 10) || 9;
    const page = parseInt(pageActual, 10) || 1;

    // create an options object
    let options = {
      offset: getOffset(page, limit),
      limit: limit,
      include: [
        {
          model: Category,
          atributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: State
        }
      ],

      distinct: true,
    };

    // check if the search object is empty
    if (Object.keys(search).length) {
      options = { ...search, ...options };
    }

    // check if the order array is empty
    if (order && order.length) {
      options["order"] = order;
    }

    if (Object.keys(filter).length) {
      options.include[0].where = { id: filter };
    }
//
    // take in the model, take in the options
    // console.log(options);
    let { count, rows } = await model.findAndCountAll(options);
    return {
      previousPage: getPreviousPage(page),
      currentPage: page,
      nextPage: getNextPage(page, limit, count),
      total: count,
      limit: limit,
      totalPages: getTotalPages(limit, count),
      data: rows,
    };
  } catch (error) {
    console.log(error);
  }
};

const getOffset = (page, limit) => {
  return page * limit - limit;
};

const getNextPage = (page, limit, total) => {
  if (total / limit > page) {
    return page + 1;
  }

  return null;
};

const getPreviousPage = (page) => {
  if (page <= 1) {
    return null;
  }
  return page - 1;
};

const getTotalPages = (limit, total) => {
  if (total > limit) {
    return Math.ceil(total / limit);
  }
  return 1;
};

module.exports = paginate;
