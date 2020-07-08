"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acorn = require('acorn');
const escodegen = require('escodegen');
const replace = require('replace');
const path = require('path');
const fs = require('fs');
const reg = new RegExp(/(configs).*\]/s);
const targetPath = path.join(process.cwd(), 'hola.config.js');
/**
 * 更新`hola.config.js`中的configs参数
 * @param {object} addCode 需要新增的对象
 */
const updateHolaConfigs = (addCode) => {
    let file = fs.readFileSync(targetPath, 'utf8');
    let comments = [];
    let tokens = [];
    const ast = acorn.parse(file, {
        locations: true,
        ranges: true,
        onComment: comments,
        onToken: tokens,
    });
    const addAst = getObjectAst(addCode);
    ast.body[0].expression.right.properties.forEach((item) => {
        if (item.key.name === 'configs') {
            item.value.elements = item.value.elements.concat(addAst);
        }
    });
    escodegen.attachComments(ast, comments, tokens); // 添加注释
    const decodedContent = escodegen.generate(ast, {
        format: {
            indent: {
                style: '  ',
                adjustMultilineComment: true,
            },
        },
        comment: true,
    });
    console.log('decodedContent', decodedContent);
    replace({
        regex: reg,
        replacement: decodedContent.match(reg)[0],
        paths: [targetPath],
        recursive: true,
        silent: true,
    });
};
/**
 * parse object to ast
 * @param {object} obj which object u want to parse
 */
function getObjectAst(obj) {
    let properties = [];
    Object.keys(obj).forEach((key) => {
        properties.push(getPropertyAst(key, obj[key]));
    });
    return {
        type: 'ObjectExpression',
        properties: properties,
    };
}
/**
 * get a object.property ast
 * @param {string} propertyKey
 * @param {string} propertyValue
 */
function getPropertyAst(propertyKey, propertyValue) {
    let propertyAstTemplate = {
        type: 'Property',
        method: false,
        shorthand: false,
        computed: false,
        key: { type: 'Identifier', name: propertyKey },
        value: {
            type: 'Literal',
            value: propertyValue,
            raw: propertyValue,
        },
        kind: 'init',
    };
    return propertyAstTemplate;
}
exports.default = updateHolaConfigs;
